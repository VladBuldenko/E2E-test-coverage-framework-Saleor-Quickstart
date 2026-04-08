# Test Coverage Matrix

## 1. GraphQL API (Smoke & Functional)
- [ ] **Auth:** `tokenCreate` with valid credentials returns a 128-char JWT.
- [ ] **Auth:** `tokenCreate` with invalid credentials returns "Account not found" error.
- [ ] **Products:** `products` query returns at least 1 product with `id`, `name`, and `slug`.
- [ ] **System:** Health check query returns server version and status.

## 2. Saleor Dashboard (Admin UI)
- [ ] **Auth:** Successful login redirects to the main dashboard stats page.
- [ ] **Auth:** Error message appears on the login screen for locked/invalid accounts.
- [ ] **Navigation:** Sidebar links for "Orders", "Products", and "Customers" are clickable and lead to correct URLs.
- [ ] **Inventory:** Product list displays the correct stock levels for a specific "vape" or "t-shirt" item.

## 3. Saleor Storefront (User UI)
- [ ] **Home:** Homepage loads in under 3 seconds with a 200 OK status.
- [ ] **Search:** Searching for "Bean juice" returns relevant search results.
- [ ] **Search:** "No results found" message appears for "XyZ123" query.
- [ ] **Cart:** Adding a product increases the cart counter in the header.