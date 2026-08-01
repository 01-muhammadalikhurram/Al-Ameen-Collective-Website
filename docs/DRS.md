# System Design Document (DRS)
## Al Ameen Collective Platform

### 1. Introduction
This Design Requirements Specification (DRS) outlines the technical architecture, data models, API structure, and structural foundation for the Al Ameen Collective e-commerce platform. It translates the requirements from the SRS into an actionable technical blueprint for MERN stack development using Agile methodology.

### 2. System Architecture
The application follows a Client-Server decoupled architecture, leveraging the MERN stack with Prisma as the ORM.

*   **Frontend (Client)**: React.js (or Next.js) serving a Single Page Application (SPA) or SSR application. State is managed via React Context/Zustand. Shopping cart persistence uses browser `LocalStorage`.
*   **Backend (API Server)**: Node.js with Express.js exposing RESTful API endpoints. 
*   **Database**: MongoDB (NoSQL), strictly typed and queried using Prisma ORM.
*   **Authentication**: JSON Web Tokens (JWT) for secure, stateless authentication on `/admin` and `/vendor` routes.
*   **Media Storage**: Product images will be stored either on the file system, MongoDB GridFS, or a dedicated cloud bucket (e.g., AWS S3 / Cloudinary), returning URL strings to the database.

---

### 3. Folder Structure
The repository will be structured as a Monorepo containing both the frontend and backend applications to streamline development and deployment.

```text
/al-ameen-collective
│
├── /backend                    # Express/Node.js API
│   ├── /prisma                 # Prisma schema and migrations
│   │   └── schema.prisma
│   ├── /src
│   │   ├── /config             # Environment, DB, external service configs
│   │   ├── /controllers        # Route logic (Auth, Product, Order, Admin, Vendor)
│   │   ├── /middlewares        # Auth verification, rate limiting, error handling
│   │   ├── /routes             # Express route definitions
│   │   └── /utils              # Helper functions (Code generation, Fuzzy search wrapper)
│   └── server.js               # Express app entry point
│
├── /frontend                   # React.js / Next.js Client
│   ├── /public                 # Static assets (favicon, generic images)
│   ├── /src
│   │   ├── /assets             # Styles, icons
│   │   ├── /components         # Reusable UI components (Navbar, AlertBar, ProductCard)
│   │   ├── /hooks              # Custom React hooks (useCart, useAuth)
│   │   ├── /pages              # Route entry components (Home, Catalog, Checkout, AdminDash)
│   │   ├── /services           # API Axios/Fetch configurations
│   │   └── /utils              # LocalStorage helpers, formatting logic
│   └── package.json
│
└── /docs                       # Project Documentation (SRS, DRS)
```

---

### 4. Database Schema (Prisma ORM)
The following defines the core entities using Prisma schema notation customized for the MongoDB provider.

#### 4.1 Enums
```prisma
enum Role {
  ADMIN
  VENDOR
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
  FILED_FOR_RETURN
  RETURNED
}

enum Gender {
  MALE
  FEMALE
  UNISEX
}
```

#### 4.2 Models

**1. User (For Authentication)**
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  username  String   @unique
  password  String   // Hashed via bcrypt
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**2. Product**
```prisma
model Product {
  id                 String   @id @default(auto()) @map("_id") @db.ObjectId
  productCode        String   @unique // Auto-generated e.g., LWN-RD-0018
  name               String
  categories         String[] // Tags e.g., ["Lawn", "Summer"]
  gender             Gender
  color              String
  wholesalePrice     Float    // Vendor's base cost
  summary            String   // Short description for cards
  description        String   // Detailed description
  images             String[] // Array of image URLs
  
  // Optional Fields
  brand              String?
  productType        String?  // e.g., 3PC Suit
  fabricType         String?
  cuttingSize        String?
  shirtDetails       String?
  trouserDetails     String?
  
  isActive           Boolean  @default(true) // Visibility toggle
  commissionOverride Float?   // Null means use Global Commission
  
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
```

**3. Order & OrderItems**
```prisma
model Order {
  id                  String      @id @default(auto()) @map("_id") @db.ObjectId
  orderId             String      @unique // Public facing ID e.g., ORD-12345
  
  // Customer Info
  customerName        String
  customerPhone       String
  customerWhatsapp    String
  customerAddress     String
  customerRemarks     String?
  
  // Financials Snapshot (Immutable post-creation)
  deliveryCharges     Float
  totalWholesalePrice Float
  totalAdminCommission Float
  totalCustomerPayable Float       // totalWholesalePrice + totalAdminCommission + deliveryCharges
  
  // States
  status              OrderStatus @default(PENDING)
  commissionReceived  Boolean     @default(false)
  
  items               OrderItem[] // Embedded or linked items
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
}

model OrderItem {
  id                  String   @id @default(auto()) @map("_id") @db.ObjectId
  orderId             String   @db.ObjectId
  order               Order    @relation(fields: [orderId], references: [id])
  
  productId           String   @db.ObjectId
  productName         String
  productCode         String
  productImage        String   // Primary image at time of order
  
  quantity            Int
  
  // Snapshot of pricing at exact time of order to prevent historical data corruption if prices change later
  wholesalePriceAtTime Float
  commissionAtTime     Float
  sellingPriceAtTime   Float   // (wholesalePriceAtTime + commissionAtTime) * quantity
}
```

**4. System Configuration (Singleton)**
```prisma
model Config {
  id                    String  @id @default(auto()) @map("_id") @db.ObjectId
  globalCommission      Float   @default(1000)
  baseDeliveryCharge    Float   @default(250)
  freeDeliveryEnabled   Boolean @default(false)
  freeDeliveryThreshold Float   @default(5000)
}
```

---

### 5. API Endpoint Definitions
All payloads and responses will be in `application/json`. Endpoints prefixed with `/api/admin` or `/api/vendor` require a valid JWT Bearer token.

#### 5.1 Public Endpoints
*   `POST /api/auth/login`: Authenticates Admin/Vendor, returns JWT.
*   `GET /api/products`: Retrieves active catalog. Query params: `?search=term&category=lawn`. Implements Fuse.js fuzzy search on the backend.
*   `GET /api/products/:productCode`: Retrieves full details for a single product.
*   `POST /api/orders`: Submits a new order. Accepts cart array and customer details. Calculates final prices server-side to prevent client spoofing.
*   `GET /api/orders/track/:orderId`: Returns order status and customer-facing financials (no wholesale data).

#### 5.2 Admin Endpoints (Requires Admin JWT)
*   `GET /api/admin/dashboard`: Returns aggregate analytics (Total orders, pending commissions, etc.).
*   **Products:**
    *   `POST /api/admin/products`: Creates a new product.
    *   `PUT /api/admin/products/:id`: Updates a product.
    *   `PATCH /api/admin/products/:id/toggle`: Flips `isActive` status.
*   **Orders:**
    *   `GET /api/admin/orders`: Retrieves all orders with filters.
    *   `GET /api/admin/orders/:id`: Retrieves full order details (including wholesale breakdown).
    *   `PATCH /api/admin/orders/:id/status`: Updates order status (e.g., to CONFIRMED).
    *   `PATCH /api/admin/orders/:id/commission`: Toggles `commissionReceived`.
*   **Config:**
    *   `GET /api/admin/config`: Retrieves financial/delivery settings.
    *   `PUT /api/admin/config`: Updates financial/delivery settings.

#### 5.3 Vendor Endpoints (Requires Vendor JWT)
*   `GET /api/vendor/dashboard`: Returns vendor analytics (Orders to dispatch, total payout owed).
*   `GET /api/vendor/orders`: Retrieves orders with status >= CONFIRMED.
*   `GET /api/vendor/orders/:id`: Retrieves specific order details with strict financial breakdown (Wholesale vs Commission vs Delivery).
*   `PATCH /api/vendor/orders/:id/status`: Updates status (Allowed: SHIPPED, DELIVERED, RETURNED).
*   `GET /api/vendor/payouts`: Retrieves history of orders where `commissionReceived == true`.

---

### 6. Critical Implementation Logic
1.  **Server-Side Pricing Trust**: The client (frontend) cart is strictly visual. When checkout occurs, the client sends `{ productId, quantity }`. The backend completely recalculates the `totalCustomerPayable` by fetching current prices from the DB and applying current config settings.
2.  **Order Snapshotting**: When an order is created, `OrderItem` records duplicate the product name, image, and price at that exact millisecond. If the Admin later edits the product price or image, historical orders remain unaffected.
3.  **Code Generation Algorithm**: Handled in a backend utility function triggered pre-save on Product creation.
4.  **Transaction Safety**: Order creation must be an atomic transaction (creating the Order and its OrderItems simultaneously) to maintain database integrity.
