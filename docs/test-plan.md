# Test Plan: Saleor Quickstart Automation

## 1. Introduction
This Test Plan describes the specific testing activities for the Saleor Quickstart project. It details the scope, features to be tested, and the expected deliverables. 

**Reference:** All activities must comply with the guidelines defined in `docs/test-strategy.md`.

## 2. Test Scope
The testing efforts will be focused on the three main entry points of the Saleor ecosystem:
- **Saleor Storefront:** Customer-facing web application.
- **Saleor Dashboard:** Administrative management interface.
- **GraphQL API:** The data layer connecting all services.

## 3. Features to be Tested

### 3.1 GraphQL API (The "API-First" Layer)
- **Authentication:** Validating `tokenCreate` mutations and JWT handling.
- **Product Management:** Querying product lists, variants, and stock levels.
- **Health Checks:** Ensuring the `/graphql/` endpoint is responsive.

### 3.2 Saleor Dashboard (Admin Operations)
- **Login Flow:** Successful and failed authentication via UI.
- **Navigation:** Accessibility of the Products, Categories, and Orders sections.
- **Product Visibility:** Verifying that products created via API appear correctly in the admin list.

### 3.3 Saleor Storefront (Customer Journey)
- **Product Catalog:** Browsing products and categories.
- **Search Functionality:** Searching for existing and non-existing items.
- **Shopping Cart:** Adding/removing items and price calculations (Basic).

## 4. Test Environments
- **Environment:** Local Saleor Quickstart (Docker-based).
- **URLs:** Defined in `.env` (Storefront, Dashboard, API).
- **Browsers:** Primary focus on Chromium (as per Strategy).

## 5. Entry & Exit Criteria

### 5.1 Entry Criteria
- Automation framework structure (`src/` and `tests/`) is initialized.
- Saleor Quickstart is running and accessible locally.
- Admin credentials and API tokens are configured in `.env`.

### 5.2 Exit Criteria
- **Smoke Suite:** 100% pass rate for critical availability checks.
- **Core Functional:** All planned test cases for Auth and Search are automated and passing.
- **Reporting:** HTML report is generated and contains evidence for all executed tests.

## 6. Deliverables
- **Test Automation Code:** Residing in the `tests/` and `src/` directories.
- **Test Strategy:** Documented in `docs/test-strategy.md`.
- **Test Reports:** Playwright HTML reports including traces and screenshots for failures.
- **CI/CD Pipeline:** GitHub Actions workflow for automated execution.

## 7. Risks & Mitigations
| Risk | Mitigation |
| :--- | :--- |
| Saleor environment instability | Use `expect.poll` for retrying flaky API responses. |
| Frequent UI changes in Saleor | Use strict `data-testid` selectors to minimize POM maintenance. |
| Database pollution | Implement strict API-based cleanup in `afterEach` hooks. |
