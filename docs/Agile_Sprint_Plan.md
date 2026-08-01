# Agile Sprint & Release Plan
## Al Ameen Collective Platform

### 1. Introduction
This document outlines the Agile release strategy for the Al Ameen Collective platform. The development lifecycle is broken down into strictly sequential, dependency-driven sprints. 

**Logical Reasoning for Sequence**: We cannot build a public catalog without a database of products; we cannot build checkout without a catalog; we cannot build Vendor fulfillment without an order generation system. Thus, the backend foundation and Admin product management must be built first, followed by the Customer experience, and finally the Vendor fulfillment and financial reconciliation.

---

### Sprint 1: Architecture, Foundation & Database
**Goal**: Establish the core infrastructure, database schemas, and foundational authentication logic.
*   **Tasks**:
    *   Initialize Monorepo structure (Frontend/Backend).
    *   Configure Node.js/Express server and error-handling middleware.
    *   Set up Prisma ORM and connect to MongoDB.
    *   Execute database migrations for User, Product, Order, OrderItem, and Config schemas.
    *   Implement JWT Authentication logic (Login endpoints, Role-based route protection).
    *   Initialize React.js (or Next.js) frontend with TailwindCSS/Custom CSS design tokens (colors, typography).
*   **Deliverable**: A running backend connected to the database, secure authentication routes testing successfully via API, and a blank frontend application with correct theming.

---

### Sprint 2: Admin Panel (Product Engine & Config)
**Goal**: Empower the Admin to manage the core data of the application (Products and Business Rules) so the frontend has real data to consume.
*   **Tasks**:
    *   Build Admin Authentication UI (`/admin/login`).
    *   Build the Admin Dashboard layout (Sidebar, Header).
    *   Implement Global Config API & UI (Set global commission, delivery charges, free shipping thresholds).
    *   Build Product Management API (CRUD operations).
    *   Build Product Form UI (Image drag-and-drop, dynamic optional fields).
    *   **Core Logic**: Implement the automated Product Code generation algorithm (`Category-Color-Gender`).
*   **Deliverable**: A fully functional Admin panel where the user can create, edit, hide, and manage products and business configurations.

---

### Sprint 3: Customer Interface (Discovery & Browsing)
**Goal**: Build a high-performance, visually stunning public storefront to display the products created in Sprint 2.
*   **Tasks**:
    *   Build public layout (Promotional Alert Bar, Navigation Bar with sliding effects).
    *   Build Homepage.
    *   Build Catalog Page with dynamic category filter buttons.
    *   **Core Logic**: Implement Fuse.js fuzzy search for highly tolerant product discovery.
    *   Build visually rich Product Cards.
    *   Build detailed Product View Page with image galleries and "Similar Products" algorithm.
*   **Deliverable**: A fully navigable public website where customers can browse, filter, and search real products retrieved from the database.

---

### Sprint 4: Cart, Checkout & Order Generation
**Goal**: Enable the Customer to convert browsing into a finalized order without requiring an account.
*   **Tasks**:
    *   Implement `LocalStorage` persistence for the Shopping Cart (no database required).
    *   Build Cart slide-out/page UI with quantity modifiers.
    *   Build Checkout Form (Name, Phone, WhatsApp, Address).
    *   Implement "Order Now" bypass (single item straight to checkout).
    *   **Core Logic**: Backend calculation of Customer Payable (Wholesale + Commission + Delivery) to ensure absolute financial security.
    *   **Core Logic**: Generate unique Order ID and execute atomic database transaction for Order + OrderItems snapshotting.
    *   Implement WhatsApp redirect integration upon successful order.
*   **Deliverable**: A complete checkout pipeline. Customers can place orders, which securely appear in the database.

---

### Sprint 5: Vendor Fulfillment & Admin Order Management
**Goal**: Build the operational logistics pipeline allowing the Admin to route orders to the Vendor, and the Vendor to fulfill them.
*   **Tasks**:
    *   Build Admin Order List and Order Detail UI.
    *   Implement Admin status update logic (Mark as Confirmed, generate private Vendor link).
    *   Build Vendor Authentication UI (`/vendor/login`).
    *   Build Vendor Dashboard and Order Visibility UI (Strictly showing Wholesale vs Commission split).
    *   Implement Vendor status update logic (Mark as Shipped, Mark as Delivered, Mark as Returned).
*   **Deliverable**: End-to-end order processing flow. An order can move from "Pending" (Admin) to "Confirmed" (Admin) to "Shipped/Delivered" (Vendor).

---

### Sprint 6: Financial Reconciliation, Analytics & Polish
**Goal**: Finalize the financial tracking state machines, populate all dashboard analytics, and apply final aesthetic polish.
*   **Tasks**:
    *   Build public Order Tracking page (`/track/[ORDER-ID]`).
    *   **Core Logic**: Implement Commission State Machine (Admin manually marks "Commission Received" after Vendor pays).
    *   Populate Admin Dashboard Widgets (Total Commissions Earned, Pending, Order aggregations).
    *   Populate Vendor Dashboard Widgets (Total Owed to Admin, Payout History log).
    *   Comprehensive UI/UX polish (micro-animations, responsive testing on mobile).
    *   Final QA and security audit (helmet, rate limiting).
*   **Deliverable**: The finalized, production-ready Al Ameen Collective application.

---

### Execution Protocol
As per your constraints, I will **not** start coding any of these sprints until we agree to begin. When development starts, I will ask for explicit authorization before beginning Sprint 1, summarize my work upon completion, and ask for authorization before proceeding to Sprint 2.
