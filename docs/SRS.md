# Software Requirements Specification (SRS)
## Al Ameen Collective Platform

### 1. Introduction
#### 1.1 Purpose
This document specifies the software requirements for the Al Ameen Collective dropshipping e-commerce platform. It translates the project vision into precise functional, non-functional, and business logic requirements to guide the Agile development lifecycle.

#### 1.2 Scope
Al Ameen Collective is a full-stack, zero-inventory e-commerce system connecting a reseller (Admin) with a wholesale vendor (Vendor) and end-buyers (Customers). The system handles product marketing, zero-friction customer checkouts, dynamic order tracking, and completely transparent financial reconciliation (commissions and payouts) between the Admin and the Vendor.

#### 1.3 Definitions & Acronyms
*   **Admin**: The platform owner (reseller) who manages the website, curates products, and earns a commission per sale.
*   **Vendor**: The supplier who physically holds inventory, ships orders, collects cash from the customer, and owes commission to the Admin.
*   **Customer**: The end-user purchasing goods without requiring account registration.
*   **Wholesale Price**: The base cost of the product dictated by the Vendor.
*   **Commission**: The Admin's profit margin per product.
*   **Selling Price**: Wholesale Price + Commission.

---

### 2. Overall Description
#### 2.1 User Classes and Characteristics
*   **Customer**: Requires a high-performance, visually stunning, login-free browsing and checkout experience. The journey from product discovery to order placement must be absolutely seamless.
*   **Admin**: Requires an authoritative, data-rich dashboard. Needs granular control over product listings, order routing, and financial tracking to run the business efficiently.
*   **Vendor**: Requires a secure, focused dashboard. Needs absolute financial transparency on orders they fulfill to prevent disputes and clear actions for updating dispatch/delivery statuses.

#### 2.2 Operating Environment
*   **Architecture**: MERN Stack (MongoDB, Express.js, React.js, Node.js).
*   **Database ORM**: Prisma with MongoDB provider.
*   **Platform**: Web-based, responsive (Mobile-first approach scaling up to Desktop).

---

### 3. Functional Requirements

#### 3.1 Customer Interface (Public)
*   **REQ-C1 (Navigation & Alerts)**: The system shall display a sliding top alert bar for promotions and a sticky navigation bar providing access to Catalog, About, FAQs, Contact, Cart, and Order Tracking.
*   **REQ-C2 (Product Discovery)**: The system shall feature a product catalog with dynamic filtering (auto-generated from product tags) and a highly tolerant fuzzy search across all product attributes.
*   **REQ-C3 (Product Details)**: The system shall present product pages with image galleries, flexible attribute displays (fabric, cutting, etc.), and a dynamic "Similar Products" recommendation section.
*   **REQ-C4 (Shopping Cart)**: The system shall maintain a persistent cart utilizing browser LocalStorage (no server-side persistence required for anonymous users).
*   **REQ-C5 (Checkout Flow)**: The system shall support a one-click "Order Now" bypass for single items and a standard cart checkout. It must collect essential details (Name, Phone, WhatsApp, Address) and issue a unique Order ID.
*   **REQ-C6 (WhatsApp Integration)**: Upon successful order placement, the system shall seamlessly open the customer's WhatsApp with a pre-filled order summary directed to the Admin's number (explicitly excluding pricing in the message).
*   **REQ-C7 (Order Tracking)**: The system shall expose a public tracking URL (`/track/[ORDER-ID]`) allowing customers to monitor real-time order progression and financial totals.

#### 3.2 Admin Panel (Secured)
*   **REQ-A1 (Authentication)**: The system shall secure the `/admin` route via JWT authentication for a single administrative user.
*   **REQ-A2 (Dashboard Analytics)**: The system shall aggregate and display real-time business metrics including order volume by status, total commissions earned, pending commissions, and product performance rankings.
*   **REQ-A3 (Product Management)**: The system shall provide comprehensive CRUD operations for products, including multi-image uploads and an Active/Inactive visibility toggle.
*   **REQ-A4 (Automated Code Generation)**: The system shall auto-generate unique Product Codes based on a strict convention (Category + Color + Gender parity) which the Admin can review before saving.
*   **REQ-A5 (Order Management)**: The system shall allow the Admin to view all orders, transition statuses (Confirm, Cancel, Return), generate secure Vendor dispatch links, and manually mark commissions as received.
*   **REQ-A6 (Financial Configuration)**: The system shall allow the Admin to configure a global flat commission rate, per-product commission overrides, a base delivery charge, and a free-delivery threshold.

#### 3.3 Vendor Panel (Secured)
*   **REQ-V1 (Authentication)**: The system shall secure the `/vendor` route via JWT authentication for the supplier, with credentials managed strictly by the Admin.
*   **REQ-V2 (Vendor Dashboard)**: The system shall provide an overview of orders pending dispatch and total pending payouts owed to the Admin.
*   **REQ-V3 (Financial Transparency)**: The system shall display a rigorous financial breakdown per order (Wholesale + Admin Commission = Selling Price + Delivery) to eliminate ambiguity.
*   **REQ-V4 (Restricted Status Updates)**: The system shall restrict the Vendor to updating physical logistical statuses only (Mark as Shipped, Mark as Delivered, Mark as Returned). They cannot confirm new orders.
*   **REQ-V5 (Payout History)**: The system shall maintain an immutable log of commissions successfully paid out to the Admin.

---

### 4. Business Logic & Rules
*   **BL-1 (Pricing Equation)**: Customer Total Payable = `SUM(Wholesale Price + Admin Commission)` for all cart items + `Delivery Charges`.
*   **BL-2 (Product Code Uniqueness)**: The system must enforce absolute uniqueness on Product Codes. Auto-generation logic: `[Category Abbreviation]-[Color Abbreviation]-[Even(Female) or Odd(Male) Integer]`.
*   **BL-3 (Order State Machine)**: 
    *   Admin scope: `Pending -> Confirmed`, `Cancelled`, `Filed for Return`.
    *   Vendor scope: `Confirmed -> Shipped -> Delivered`, `Returned`.
*   **BL-4 (Commission State Machine)**: Commissions are calculated upon order creation, marked "Pending" when an order is `Delivered`, and moved to "Earned" only when the Admin triggers `Commission Received`.

---

### 5. Non-Functional Requirements
*   **NFR-1 (Performance)**: The fuzzy search (e.g., Fuse.js) must resolve queries across the entire catalog in < 300ms.
*   **NFR-2 (Security)**: Passwords must be hashed (bcrypt). API routes must enforce strict rate-limiting, Helmet.js header protections, and thorough input sanitization to prevent injection attacks.
*   **NFR-3 (Design Aesthetics)**: The user interface must employ premium, modern design tokens (rich colors, glassmorphism, micro-animations) to ensure the platform feels exceptionally high-end and trustworthy.
*   **NFR-4 (Resilience)**: The system must gracefully handle sparse data. If the Admin leaves optional product fields (like Trouser Details) blank, the UI must adapt seamlessly without breaking layouts.

---

### 6. User Stories (Agile Scope)
*   **Epic 1: Frictionless Shopping**
    *   *As a Customer, I want to search using informal spellings (e.g., "laun" instead of "lawn") and still find relevant products.*
    *   *As a Customer, I want my cart to remain intact even if I accidentally close the tab.*
*   **Epic 2: Reseller Control**
    *   *As an Admin, I want the system to suggest structured Product Codes so my catalog remains highly organized without mental overhead.*
    *   *As an Admin, I want a dedicated dashboard widget showing exactly how much commission the Vendor owes me right now.*
*   **Epic 3: Supplier Fulfillment**
    *   *As a Vendor, I want to see the exact Wholesale vs. Commission split on every order, so I know exactly what cash to collect and how much belongs to the Admin.*
