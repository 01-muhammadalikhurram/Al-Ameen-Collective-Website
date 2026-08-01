# Test Plan & Quality Assurance (QA) Strategy
## Al Ameen Collective Platform

### 1. Introduction
This Quality Assurance (QA) Strategy defines the rigorous testing methodologies applied throughout the Agile development lifecycle of the Al Ameen Collective platform. Our philosophy mandates zero-tolerance for mathematical errors in financial calculations, strict role-based access control, and a flawless user experience across devices.

---

### 2. Testing Methodology
We will employ a multi-layered testing approach, executing automated backend tests and rigorous manual frontend checks before authorizing the release of any Agile sprint.

#### 2.1 Unit Testing (Backend Logic)
*   **Scope**: Isolated pure functions and critical algorithms.
*   **Tooling**: `Jest`
*   **Critical Test Cases**:
    *   **Financial Integrity**: Verify the `Customer Total Payable` formula strictly equals `SUM(Wholesale + Admin Commission) + Delivery`.
    *   **Automated Product Codes**: Assert that the code generator correctly outputs the `Category-Color-Gender` format and maintains parity rules (Even = Female, Odd = Male).
    *   **Fuzzy Search Engine**: Assert that queries with minor typos (e.g., "laun" for "lawn") correctly return expected matches.

#### 2.2 API / Integration Testing (Backend Routes)
*   **Scope**: Express.js REST API endpoints, Database Transactions, and Authentication logic.
*   **Tooling**: `Jest` + `Supertest` + `Prisma Test Environment`
*   **Critical Test Cases**:
    *   **Authentication**: Assert that `/admin/*` and `/vendor/*` routes reject requests without a valid JWT (HTTP 401 Unauthorized).
    *   **Role-Based Access Control (RBAC)**: Assert that a Vendor token attempting to access an Admin route is strictly denied (HTTP 403 Forbidden).
    *   **Atomic Transactions**: Assert that if an `OrderItem` fails to save, the parent `Order` is rolled back completely.
    *   **Checkout Validation**: Assert that the server strictly overrides any client-submitted pricing, recalculating totals directly from the database to prevent spoofing.

#### 2.3 Manual UI & End-to-End Testing (Frontend)
*   **Scope**: User experience, visual rendering, responsiveness, and complex state management (LocalStorage).
*   **Tooling**: Manual testing via Chrome DevTools (simulating Mobile, Tablet, Desktop viewports).
*   **Critical Test Cases**:
    *   **Responsive Layouts**: Verify the Navbar, Product Grid, and Checkout forms render perfectly on screens as small as 320px width.
    *   **Cart Persistence**: Add items to cart -> close the browser -> reopen the browser -> verify items persist via LocalStorage.
    *   **Dynamic Data Rendering**: Test a product with all optional fields filled vs. a product with no optional fields. The UI must not break or show empty, awkwardly spaced containers.
    *   **WhatsApp Handoff**: Verify the "Place Order" button seamlessly triggers the native WhatsApp application or web-client with the accurately formatted template (strictly excluding price data).

---

### 3. State Machine & Business Rule Validation
The core operational logic of the platform relies on strict state machines that must be validated extensively:

#### 3.1 Order State Flow Validation
*   **Admin Scope Check**: Verify Admin can change order status from `Pending` -> `Confirmed` -> `Cancelled`.
*   **Vendor Scope Check**: Verify Vendor cannot change status to `Confirmed`. Verify Vendor can only advance a `Confirmed` order to `Shipped` -> `Delivered`.

#### 3.2 Commission State Validation
*   **Accrual Logic**: Verify that when an order is created, commission records as part of the Order snapshot but is NOT added to the Admin's "Earned" balance.
*   **Payout Logic**: Verify that commission moves to "Pending" when an order is `Delivered`, and only moves to "Earned" when the Admin explicitly triggers the `Commission Received` action.

---

### 4. Release Gates (Sprint Definitions of Done)
Before any Sprint is considered successfully completed and presented for your authorization to proceed, it must pass the following QA gates:

1.  **Code Review**: Code must be fully commented, modular, and free of linting errors.
2.  **Test Pass Rate**: 100% of defined Jest Unit and API tests for that sprint's features must pass.
3.  **Visual Audit**: Manual verification that the UI matches the premium aesthetics defined in the UI/UX Plan (colors, typography, micro-animations intact).
4.  **No Regressions**: Features built in previous sprints must continue to function perfectly with newly integrated code.

If any of these gates fail, the sprint is not done, and fixes will be applied before requesting authorization for the next sprint.
