PROJECT OVERVIEW
System Purpose
You are building Al Ameen Collective – a full-stack e-commerce dropshipping platform that enables a reseller (Admin) to sell products from a wholesale cloth vendor (Vendor) to end customers (Customers). The system operates on a zero-inventory model where the Admin markets products, takes orders, forwards them to the Vendor, and earns commission on each sale.

Key Facts
Business Location: Pakistan (Currency: PKR)

Business Model: Dropshipping / Reselling

Admin: The user (reseller) who manages the website and earns commission

Vendor: The cloth shop owner who holds inventory, ships products, and collects payments

Customer: End buyers who purchase products through the website

Tech Stack: MERN (MongoDB, Express.js, React.js, Node.js) with Prisma ORM

Development Approach: Agile methodology – you will plan your own sprints, build incrementally, and request authorization before starting each sprint

DEVELOPMENT PHILOSOPHY
Agile Methodology
You must follow Agile principles throughout development

Break down the project into logical sprints (you decide the structure)

Build incrementally, delivering working functionality at each sprint

DO NOT start writing code until the user explicitly authorizes you to proceed

After each sprint, provide a clear summary of what was completed

Explicitly ask the user for authorization before moving to the next sprint

Be transparent about dependencies and challenges

Modular Architecture
Build the application with clean, modular, well-commented code

Separate concerns (frontend, backend API, database models, authentication)

The user should be able to add features in future without breaking existing functionality

Leave appropriate "hooks" for future automation (email/SMS notifications, payment gateways, etc.)

Quality Standards
Write production-ready, maintainable code

Implement proper error handling and validation

Ensure responsive design (mobile-friendly)

Follow security best practices (authentication, authorization, input sanitization)

The user should not need to touch code for daily operations

USER ROLES & INTERACTIONS
ROLE 1: CUSTOMER (The Buyer)
The customer accesses the public-facing website. They do not need to log in or create an account. Their journey must be seamless and intuitive.

1.1 Homepage & Navigation
Top Ribbon (Alert Bar):

Minimalistic black background

White text centered horizontally

Multiple alerts slide automatically (left to right or sliding carousel effect)

One alert is displayed at a time; it slides out to the left as the next slides in from the right

Purpose: Display promotional messages (e.g., "Free Delivery on Orders above PKR 9,999", "Sale Live!", "New Collection Arrived")

Initially, only generic alerts will be shown; Admin will manage these later

Navigation Bar:

Background Color: #DBB177

Font Color: #510F17

Layout (Left to Right):

Left: Logo "Al Ameen Collective" (vertically centered)

Center (Right-aligned): Catalog | About | FAQs | Contact | Cart | Track Order | Search Bar

Navigation Behaviors:

Catalog: Clicking navigates to the full product listing page with filters

About: Scrolls down to the About section in the footer

FAQs: Scrolls down to the FAQ section in the footer

Contact: Scrolls down to the Contact section in the footer (shows Admin's WhatsApp number)

Cart: Navigates to the shopping cart page

Track Order: Navigates to the order tracking page where customers enter their Order ID

Search Bar:

Located in the navbar and also on the catalog page

Both function identically

If searched from navbar, automatically navigates to catalog page showing results

Supports fuzzy search (handles typos like "laun" → "lawn")

1.2 Catalog Page (Product Listing)
Filters:

Dynamic filter buttons derived from product categories

When Admin adds a new product with a new category, that category automatically appears as a filter

Clicking a filter shows only products with that category/tag

Filters are displayed as clickable buttons (e.g., "Lawn", "Summer", "Embroidered", "Men", "Women")

Search Bar (Catalog-specific):

Same functionality as navbar search

Supports fuzzy search (implement using Fuse.js or similar lightweight library)

Search results should be relevant even with spelling mistakes

Product Cards Display:

Background: White

Cards have a subtle light shadow

Each card displays:

Product Image

Product Price (Admin's selling price)

Product Code (unique identifier, no two products share the same code)

Summarized/Catchy Details (short description)

Card Interaction: The entire card is clickable and serves as the "Details" button

Clicking the card navigates to the Product Detail Page

Each card also has:

Order Now button (single item, quantity = 1)

Add to Cart button (adds product to cart with quantity = 1)

1.3 Product Detail Page
When a customer clicks a product card, they see:

Full product description (all details from the Admin's entry)

Product images (multiple, gallery-style)

Product attributes (Fabric, Length, Cutting, Shirt/Trouser details, etc. – whatever the Admin entered)

Product Price

Product Code

Order Now button (single item, quantity = 1)

Add to Cart button

Similar Products Section:

Below the product details

Shows products with similar categories/tags or descriptions

Different product codes (not the same product)

1.4 Shopping Cart
Cart Storage:

Stored in browser's LocalStorage

Persists even after the user leaves the website

Only removed when the user manually deletes items

Cart Interface:

Vertical list of products added

For each product:

Product Image (thumbnail)

Product Name/Summary

Price per unit

Quantity selector (+ and - buttons)

"Remove" option (if quantity reaches 0 via - button, product is auto-removed)

Total price (sum of all products)

Checkout button (proceeds to checkout with multi-item order)

1.5 Checkout & Order Submission
Order Now (Single Item):

Bypasses the cart entirely

Creates an order for exactly 1 unit of that specific product

Immediately redirects to the Checkout Form

Checkout (Multi-Item from Cart):

Allows multiple products with varying quantities

Total price = sum of (Wholesale Price + Admin Profit) for all items

Delivery charges added as a one-time flat fee per order

Checkout Form Fields (All Required):

Full Name

Phone Number

WhatsApp Number

Address

Optional: Additional remarks/notes

Form Submission Behavior:
Upon clicking the final order button:

Order is saved in database with a unique Order ID

Public Tracking Link generated: yoursite.com/track/[ORDER-ID]

This link shows the customer their order status

Displays: Order ID, Product image, Product total price, Delivery charges, Grand total (customer pays upon delivery)

Shows order status: Pending, Confirmed, Shipped, Delivered, Cancelled, Filed for Return, Returned

WhatsApp Integration:

Customer's WhatsApp opens automatically

Pre-filled template message sent to Admin's WhatsApp number

Contains: Customer details (Name, Address, Phone), Product details (what they ordered, quantity)

IMPORTANT: Product price is NOT included in this WhatsApp message (Admin manually handles pricing with Vendor)

Message is pre-filled and waiting for customer's final confirmation to send

1.6 Order Tracking Page
Dedicated page accessed via "Track Order" in navbar

Input field: Enter Order ID

Track Order button

Upon submission, displays:

Order details (products, quantities, images)

Current status (Pending, Confirmed, Shipped, Delivered, Cancelled, Filed for Return, Returned)

Customer total payable

Delivery charges

Timestamps (order date, status update dates)

ROLE 2: ADMIN (You – The Reseller/Business Owner)
The Admin is the single owner/operator of the platform. Accessible via login at yoursite.com/admin. The Admin has full control over products, orders, commissions, and delivery settings.

2.1 Admin Login
Dedicated login page at /admin

Secure authentication (JWT-based or session-based)

Only one Admin user (you)

Credentials managed via environment variables or database seed

2.2 Admin Dashboard
Analytics Widgets (Top Section):
Displayed as cards with numbers:

Total Orders (all time)

Pending Orders (orders awaiting Admin action)

Confirmed Orders (orders forwarded to Vendor, awaiting shipping)

Shipped Orders (dispatched by Vendor)

Delivered Orders (completed)

Cancelled Orders

Filed for Return

Returned Orders

Financial Widgets:

Total Commission Earned (from Delivered orders where Commission Received = TRUE)

Total Commission Pending (from Delivered orders where Commission Received = FALSE)

Potential Earnings (from Confirmed/Shipped orders not yet delivered)

Product Performance Section (Below Widgets):

List of products sorted: Most Sold → Least Sold

List of products sorted: Least Returns → Most Returns

Recent Orders:

Quick view of the last 10 orders

2.3 Product Management
Add New Product:

The Admin uses a dynamic form with the following fields:

Mandatory Fields:

Product Name

Category/Tags (e.g., Lawn, Summer, Embroidered, Men, Women, Kids – multiple tags allowed)

Gender (Male / Female / Unisex)

Color (dropdown or text input)

Wholesale Price (PKR – the Vendor's price)

Catchy Summary (short description for product card)

Full Description (detailed product description)

Multiple Images (drag-and-drop upload, at least 1 required)

Optional Fields (Flexible):

Brand / Collection (e.g., Nishat, Alkaram, etc.)

Product Type (dropdown: 2PC Suit, 3PC Suit, Single Shirt, Single Trouser, Unstitched Fabric, Other)

Fabric Type (e.g., Lawn, Cotton, Khadar, Silk)

Cutting / Size (e.g., 3.5 Gaz, 30x30 Inches, M/L)

Shirt Details (textarea – for describing shirt-specific details)

Trouser Details (textarea – for describing trouser-specific details)

Why Optional Fields Exist: Vendor descriptions are highly inconsistent. Some products have length, some have fabric details, some have shirt/trouser-specific details. The Admin should be able to enter whatever is available and leave the rest blank.

Product Code Auto-Generation:

System automatically generates a meaningful suggested code based on:

Category (abbreviated, e.g., LWN = Lawn, WW = Wash n Wear)

Color (abbreviated, e.g., RD = Red, BL = Blue, MT = Multicolor)

Gender parity: Even numbers = Female, Odd numbers = Male

Example: LWN-RD-0018 = Lawn, Red, Female (even number)

Example: WW-BL-1023 = Wash n Wear, Blue, Male (odd number)

Admin can edit this suggested code before saving

No two products can have the same Product Code (must be unique)

Edit Product:

Admin can update any field

Replace/add images

Modify commission override (see Commission section below)

Hide/Unhide Product:

Simple Toggle button (Active/Inactive) in the product list

Inactive: Product disappears completely from customer catalog

Active: Product appears in customer catalog

Product List View:

Table displaying all products

Columns: Product Code, Product Name, Category, Wholesale Price, Selling Price, Status (Active/Inactive), Actions (Edit, Toggle Active/Inactive)

2.4 Order Management
Order List:

Filterable table/list of all orders

Columns: Order ID, Customer Name, Total Amount, Status, Date, Actions

Filters:

Dropdown filter by Status (All, Pending, Confirmed, Shipped, Delivered, Cancelled, Filed for Return, Returned)

Date range filter (optional)

Order Detail View:
When Admin clicks on a specific order:

Customer Details: Full Name, Phone, WhatsApp, Address

Product Details: List of products ordered (names, quantities, images, individual prices)

Financial Breakdown:

Wholesale Price (Vendor cost)

Your Selling Price (Wholesale + Admin Profit)

Admin Commission (your profit)

Delivery Charges

Customer Total Payable (Selling Price + Delivery Charges)

Order Status

Update Status dropdown button with options:

Confirm Order

Order Shipped

Order Delivered

Cancel Order

Filed for Return

Order Returned

Commission Received button/toggle (manually marked after Vendor pays you)

Copy Vendor Link button (with copy-to-clipboard functionality)

Generates a private URL for the Vendor: yoursite.com/vendor/order/[ORDER-ID]

Clicking copies to clipboard with visual feedback (icon changes to tick, shows "Copied!" message)

Admin pastes this link into WhatsApp to send to Vendor

2.5 Delivery Configuration
Settings Page:

Dedicated page in Admin panel for delivery settings

Base Delivery Charge: Input field (e.g., PKR 250)

Free Delivery Threshold:

Enable/Disable toggle

Input field: "Free delivery if order total exceeds PKR [ ]"

Delivery charges are added as a one-time flat fee per order (not per product)

2.6 Commission Management
Global Commission Setting:

Default: Fixed Flat Amount (e.g., PKR 1,000)

Applied to every product by default

Per-Product Commission Override:

Admin can override the global commission for specific products

E.g., Premium products may have higher commission (PKR 1,500)

Cheap/fast-moving items may have lower commission (PKR 500)

Commission Formula:

Admin Selling Price = Wholesale Price + Admin Commission

Customer Total = Sum of (Wholesale + Commission) for all products + Delivery Charges

Commission Tracking:

When Admin marks an order as "Delivered", it appears in "Commission Pending"

Admin clicks "Commission Received" manually after Vendor pays

Once clicked, it moves to "Commission Earned"

Dashboard widgets update automatically

2.7 Admin Navigation Structure
Dashboard (default view after login)

Orders

All Orders (list view)

Order Details (click-through)

Products

All Products (list view)

Add Product

Edit Product (click-through)

Delivery Settings (single page)

Profile/Logout

ROLE 3: VENDOR (The Supplier/Cloth Shop Owner)
The Vendor has a separate login at yoursite.com/vendor. The Vendor does NOT manage products. They only handle operational logistics and financial reconciliation.

3.1 Vendor Login
Dedicated login page at /vendor

Secure authentication (JWT-based or session-based)

Separate from Admin login

Credentials managed by Admin (Admin can create or reset Vendor password)

3.2 Vendor Dashboard
Overview Widgets (Top Section):

Total Orders (all orders from this Admin/Reseller)

Pending Dispatch (orders marked Confirmed but not yet Shipped)

Total Commission Owed to Admin (from Delivered orders where Commission not yet paid)

Order List:

Table/list of all orders forwarded to this Vendor

Columns: Order ID, Customer Name, Total Amount (Customer Payable), Status, Date

Filterable by status

Search Functionality:

Input field on dashboard: "Search by Order ID"

Instantly pulls up order details when entered

3.3 Vendor Order Detail View (Financial Transparency)
When Vendor clicks on a specific order, they see a complete breakdown to eliminate disputes:

Customer Details: Name, Address, Phone Number (for shipping)

Product Details: List of products (names, quantities, images)

Financial Breakdown (Clearest Possible):

Wholesale Price (Vendor's base cost)

Admin Commission (Your Profit)

Selling Price (What Customer Pays = Wholesale + Commission)

Delivery Charges (one-time flat fee)

Customer Total Payable (Selling Price + Delivery Charges)

3.4 Vendor Order Status Permissions
The Vendor can update statuses for physical handling steps only:

Mark as Shipped (Vendor dispatches goods to customer)

Mark as Delivered (Vendor collects payment from customer)

Mark as Returned (Customer returns item)

Workflow:

Admin marks order as "Confirmed"

Vendor sees "Confirmed" order in their list

Vendor dispatches goods → clicks "Mark as Shipped"

Vendor collects payment → clicks "Mark as Delivered"

Admin's dashboard now shows this order in "Commission Pending"

Admin receives payment from Vendor → clicks "Commission Received"

Vendor's dashboard shows this order in "Payout History" (Commission marked as Paid)

3.5 Commission Reconciliation (Payouts)
Payout History:

Log/list of all commissions paid to Admin

Shows: Order ID, Date, Amount, Status (Paid)

This builds trust and helps Vendor track payables

Pending Payouts Widget:

Total amount of commissions currently owed to Admin

Based on orders that are "Delivered" but not yet marked "Commission Received"

Vendor can see exactly what they owe at a glance

3.6 Vendor Navigation Structure
Dashboard (default view after login)

Orders (list view with filter)

Order Details (click-through)

Payout History

Logout

BUSINESS RULES & LOGIC
Pricing & Financial Calculations
Customer Payable Formula:

text
Customer Total = SUM(Wholesale Price + Admin Commission for each product) + Delivery Charges
Commission Logic:

Global Default: Fixed Flat Amount (configurable by Admin, e.g., PKR 1,000)

Per-Product Override: Admin can set a specific commission amount for any product, overriding the global default

Commission Received: Manually marked by Admin after Vendor pays

Delivery Charges Logic:

One-time flat fee per order (not per product)

Base charge configurable by Admin (e.g., PKR 250)

Free Delivery Threshold configurable:

Toggle: Enable/Disable

Threshold amount: "Free if order total exceeds PKR X"

Applied at checkout based on current configuration

Product Management Rules
Product Code Uniqueness: No two products can have the same Product Code

Product Code Auto-Generation: Based on Category + Color + Gender (even = Female, odd = Male)

Optional Fields: Admin can leave fields blank; system must handle missing data gracefully

Image Storage: At least 1 image required per product; multiple images allowed

Product Hiding: Inactive products must not appear anywhere in customer catalog (including search, filters, and similar products)

Order Management Rules
Order ID Uniqueness: Every order must have a unique Order ID

Public Tracking Link: Any user can access yoursite.com/track/[ORDER-ID] without login

Vendor Private Link: yoursite.com/vendor/order/[ORDER-ID] – accessible only by logged-in Vendor

Order Status Flow (Admin Side):

text
Pending → Confirmed → Shipped → Delivered → [End]
↓ ↓
Cancelled Returned (Filed for Return → Returned)
Order Status Flow (Vendor Side):

Can only update: Pending → Shipped → Delivered → Returned

Cannot change statuses that would bypass Admin (e.g., cannot Confirm orders)

Search & Discovery Rules
Fuzzy Search: Implemented across product name, summary, description, categories, and tags

Filtering: Dynamic filters derived from product categories/tags

Combined Search: If user searches from navbar, they are redirected to catalog page with results

Cart & Checkout Rules
Cart Storage: Browser LocalStorage only (no database persistence for carts)

Cart Persistence: Remains even after user closes browser (does NOT require login)

Checkout Flow: Single-item Order Now bypasses cart; Cart Checkout handles multiple items

Order Form: All customer details are required (Name, Phone, WhatsApp, Address)

TECHNICAL SPECIFICATIONS
Tech Stack
Frontend Framework: React.js (or Next.js, decide yourself)

Backend Framework: Node.js with Express.js

Database: MongoDB

ORM/ODM: Prisma with MongoDB provider

Authentication: JWT-based (or session-based, choose the most appropriate)

Fuzzy Search: Implement using Fuse.js or similar lightweight library

Image Storage: Implementation decided by you (local storage, cloud storage, or MongoDB GridFS)

Styling: Responsive, mobile-friendly design (framework of your choice, e.g., Tailwind CSS, Material-UI, or custom CSS)

Environment Variables (Required)
The following configuration must be managed via environment variables:

Database connection URL (MongoDB)

JWT Secret Key

Admin credentials (or seed script)

Vendor credentials (or seed script)

WhatsApp number (Admin's number for order notifications)

Base URL (for generating tracking links)

Any API keys (if using external services)

Security Requirements
Admin and Vendor routes must be protected with authentication

Passwords must be hashed (bcrypt or similar)

Input validation and sanitization on all forms

CSRF protection (if using session-based auth)

Helmet.js or similar for HTTP header security

Rate limiting on authentication endpoints

Deployment Readiness
Build for production (optimized assets, environment variables separation)

Provide clear instructions for deployment (deployment platform decided later)

Database migration/seeding scripts

Clear documentation in code comments

DEVELOPMENT CONSTRAINTS
What You MUST Do
Follow Agile methodology – plan your own sprints, build incrementally

Ask for authorization before starting each sprint

Provide clear summaries after each sprint

Write clean, modular, well-commented code

Build the backend API first (or alongside frontend, but ensure API is solid before full frontend integration)

Implement proper error handling – if something fails, user should see a user-friendly message

Responsive design – must work on mobile phones, tablets, and desktops

What You MUST NOT Do
DO NOT start writing code without explicit authorization

DO NOT deviate from the business logic described above without asking the user

DO NOT build features that were not requested (avoid scope creep)

DO NOT assume the user knows technical jargon – ask clarifying questions if needed

DO NOT over-engineer – build what's requested, not what you think might be needed later

What You Can Ask The User
API keys for external services (if any)

Clarification on ambiguous requirements

Confirmation before proceeding to next sprint

Decision on implementation choices (e.g., image storage solution)

DELIVERABLES PER SPRINT
You decide the sprint structure. However, each sprint should typically include:

Plan: What you intend to build in this sprint

Development: Code implementation

Testing: Brief explanation of how you tested it

Summary: What was completed, what was not (if anything), and what's next

Authorization: Explicitly ask the user to proceed to the next sprint

SUMMARY TABLE OF REQUIREMENTS
Category Details
Project Name Al Ameen Collective
Business Type Dropshipping / Reselling (Cloth/Fabric)
User Roles Customer, Admin (Reseller), Vendor (Supplier)
Tech Stack MERN (MongoDB, Express, React, Node.js) + Prisma
Auth JWT/session-based for Admin & Vendor; Customers don't log in
Cart LocalStorage (no account required)
Search Fuzzy search (Fuse.js or similar)
Pricing Wholesale + Admin Commission (Fixed Flat, with per-product override)
Delivery One-time flat fee per order; configurable threshold for free delivery
Commission Manually marked as "Received" by Admin after Vendor pays
Transparency Vendor sees full financial breakdown (Wholesale, Selling Price, Commission)
Tracking Public link for customers; Private link for Vendor
Development Agile methodology; User-authorizes each sprint
FINAL INSTRUCTIONS
Read this entire prompt carefully.

Plan your sprints. Break down the work into logical, incremental phases.

Present your sprint plan to the user.

Wait for explicit authorization before writing a single line of code.

Build, test, and deliver working functionality each sprint.

Report progress and ask for next sprint authorization.

Ask clarifying questions if anything is unclear.

This is your complete project specification. You are now ready to begin planning. Await the user's command to proceed.
