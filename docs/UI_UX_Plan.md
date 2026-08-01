# UI/UX Flow & Wireframe Plan
## Al Ameen Collective Platform

### 1. Introduction
This document defines the user experience (UX) journey, structural wireframes, component hierarchy, and the overarching UI aesthetic for the Al Ameen Collective platform. The objective is to deliver a premium, high-converting customer experience alongside highly functional, data-dense administrative dashboards.

---

### 2. Design System & Aesthetics
To fulfill the requirement of a "rich, wow-factor" aesthetic, the platform will utilize a modern design language incorporating subtle glassmorphism, micro-animations, and a highly curated color palette.

#### 2.1 Color Palette
Based on the provided requirements, the color scheme revolves around luxury and trust:
*   **Primary Accent (Navbar Background)**: `#DBB177` (Warm Gold / Sand)
*   **Primary Text (Navbar/Headings)**: `#510F17` (Deep Maroon / Burgundy)
*   **Alert Bar Background**: `#000000` (Minimalist Black)
*   **Alert Bar Text**: `#FFFFFF` (Pure White)
*   **Background (Customer Site)**: `#FAFAFA` (Off-white / Soft Pearl) to make product images pop.
*   **Cards / Containers**: `#FFFFFF` with subtle, diffuse drop shadows (`rgba(0,0,0,0.05)`).
*   **Success / Action Buttons**: Deep Maroon or a complementary deep Green for "Order Now" triggers.

#### 2.2 Typography
We will utilize modern Google Fonts to elevate the premium feel:
*   **Headings & Brand**: `Outfit` or `Playfair Display` (for a touch of editorial elegance).
*   **Body & UI Elements**: `Inter` or `Roboto` (for maximum legibility in dashboards and product descriptions).

#### 2.3 Interactive Elements & Micro-Animations
*   **Hover States**: Product cards will gently elevate (translate-y) and slightly increase shadow depth on hover.
*   **Buttons**: Clickable elements will have a soft scale-down effect on click (active state) and smooth color transitions.
*   **Alert Bar**: Continuous, smooth horizontal marquee/sliding carousel effect.

---

### 3. User Journeys (UX Flows)

#### 3.1 Customer Journey (Frictionless Conversion)
1.  **Entry**: Lands on Homepage. Instantly sees promotional sliding alerts and the premium Navbar.
2.  **Discovery**: 
    *   Clicks "Catalog" or types in the Navbar Search.
    *   Uses dynamic tag buttons (e.g., "Lawn", "Summer") to instantly filter the grid.
    *   Fuzzy search forgives typos, ensuring they find the product.
3.  **Evaluation**: 
    *   Clicks a Product Card -> Navigates to Product Detail Page.
    *   Views high-res gallery and reads descriptions.
4.  **Action**:
    *   *Path A (Single Item)*: Clicks "Order Now" -> Bypasses cart entirely -> Lands on Checkout.
    *   *Path B (Multi Item)*: Clicks "Add to Cart" -> UI toast confirms addition -> Opens Cart -> Clicks Checkout.
5.  **Checkout & Handoff**: 
    *   Fills out a simple form (Name, Phone, WhatsApp, Address).
    *   System generates Order ID and automatically triggers a pre-filled WhatsApp message to the Admin.

#### 3.2 Admin Journey (Command & Control)
1.  **Entry**: Secure login at `/admin`.
2.  **Dashboard**: Instantly greeted with financial widgets (Pending Commissions) and operational metrics (Orders Awaiting Confirmation).
3.  **Operations**: 
    *   Navigates to "Orders", reviews new entries, clicks "Confirm Order", and generates a secure link.
    *   Navigates to "Products" to swiftly add new inventory using the auto-generated Product Code.

#### 3.3 Vendor Journey (Fulfillment Transparency)
1.  **Entry**: Secure login at `/vendor`.
2.  **Dashboard**: Sees total orders pending dispatch and total cash owed to Admin.
3.  **Fulfillment**: Clicks an order, views exactly what to pack, and the exact Wholesale vs Commission financial split. Marks order as "Shipped" then "Delivered".

---

### 4. Wireframes & Page Layouts

#### 4.1 Global Customer Layout
*   **Top Alert Bar**: 40px height, Black background, White text, smooth slide transition.
*   **Navbar**: Sticky top, Gold background (`#DBB177`), Maroon text (`#510F17`).
    *   *Left*: Logo text (vertically centered).
    *   *Right*: Inline links (Catalog | About | FAQs | Contact | Cart | Track Order) + Search Input field.
*   **Footer**: Minimalist, containing the anchor points for About, FAQs, and Contact (WhatsApp number).

#### 4.2 Customer Catalog Page
*   **Header Section**: Page title ("Collections") and a secondary, catalog-specific Search Bar.
*   **Filter Bar**: Horizontal scrolling list of pill-shaped buttons for Categories/Tags (e.g., [Lawn] [Men] [Unstitched]).
*   **Product Grid**: CSS Grid (Responsive: 1 column mobile, 2 tablet, 3/4 desktop).
*   **Product Card**:
    *   Image (Top 60% of card, object-fit cover).
    *   Content (Bottom 40%): Product Code (small, muted), Price (bold), Summary (1-2 lines truncated).
    *   Actions (Overlay or bottom edge): "Order Now" & "Add to Cart".

#### 4.3 Customer Product Detail Page
*   **Layout**: Split screen on Desktop (Image Gallery Left 50%, Details Right 50%). Stacked on Mobile.
*   **Left Side**: Main large image, with thumbnail carousel below.
*   **Right Side**:
    *   Title, Product Code, Price.
    *   Attribute grid (Fabric, Cutting, etc. — renders dynamically only if Admin provided data).
    *   Full Description paragraph.
    *   Action Buttons (Large, full-width "Order Now").
*   **Bottom Section**: "Similar Products" horizontal scrolling row.

#### 4.4 Checkout & Cart Slide-out
*   **Cart (Slide-out or Modal)**: 
    *   Vertical list of items with tiny thumbnails.
    *   Quantity increment/decrement `[ - ] 1 [ + ]`. If 0, item removes itself.
    *   Fixed bottom footer with Grand Total and "Proceed to Checkout" button.
*   **Checkout Page**:
    *   Clean, distraction-free layout.
    *   Left column: Form inputs (Name, Phone, WhatsApp, Address, Remarks).
    *   Right column: Order Summary (Items, Delivery Charge, Total Payable).

#### 4.5 Admin/Vendor Dashboards
*   **Layout**: Classic SaaS dashboard. 
    *   Left Sidebar (Navigation: Dashboard, Orders, Products, Config, Profile).
    *   Top Header (User greeting, Logout button).
    *   Main Content Area (Gray background `#F3F4F6` to contrast with White widget cards).
*   **Widgets**: Standardized white cards with drop shadows. Large typography for numbers (e.g., "PKR 45,000" in bold).
*   **Data Tables**: Used for Orders and Products lists. Includes sortable columns, pagination, and a discrete "Actions" dropdown menu per row.

---

### 5. Component Structure (React)
A modular component hierarchy to ensure code reusability:

```text
/src/components
├── /layout
│   ├── TopAlertBar.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AdminSidebar.jsx
├── /ui
│   ├── Button.jsx (Handles primary/secondary/ghost variants)
│   ├── Input.jsx  (Text, Search, Textarea with error states)
│   ├── FilterPill.jsx
│   ├── StatusBadge.jsx (Color-coded for Pending, Shipped, etc.)
├── /product
│   ├── ProductCard.jsx
│   ├── ProductGallery.jsx
│   ├── SimilarProductsRow.jsx
├── /cart
│   ├── CartDrawer.jsx
│   ├── CartItem.jsx
└── /checkout
    ├── OrderSummary.jsx
    ├── CustomerForm.jsx
```
