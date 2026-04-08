# Saleor Test Automation: Test Strategy & Architecture Guidelines

## 1. Project Objective & Core Philosophy
This framework aims to provide fast, reliable, and scalable automated tests for the Saleor Quickstart platform (Storefront, Dashboard, and GraphQL API).

**The Golden Rule:** Tests must describe *what* the user is doing (Business Logic), while the framework (`src/`) handles *how* it's done (Technical Implementation).

## 2. Technology Stack
- **Engine:** Playwright (Node.js)
- **Language:** TypeScript
- **API Interactions:** Native Playwright APIRequestContext (configured for GraphQL)
- **Data Generation:** Faker.js

## 3. Architecture Rules (Layered Approach)
Before creating a new file, ensure it goes to the correct layer:

### A. The Implementation Layer (`src/`)
- **`src/api-clients/`**: Must contain all GraphQL queries and mutations. Tests should never contain raw GraphQL strings.
- **`src/ui/components/`**: Reusable UI parts (e.g., Header, CartDrawer).
- **`src/ui/pages/`**: Page objects combining components. Must not contain assertions (`expect`); returning states or locators is allowed.
- **`src/data/builders/`**: Classes responsible for generating dynamic test data (e.g., `ProductBuilder`).

### B. The Test Layer (`tests/`)
- **`tests/api/`**: Direct testing of GraphQL endpoints (responses, schema validation).
- **`tests/ui/`**: End-to-end user flows. 
- **Rule:** A UI test file must contain minimal CSS/XPath locators. Use Page Objects from `src/`.

## 4. Test Data Management Strategy
Data flakiness is the enemy of automation. We follow the "API-First Data Strategy":
1. **No Hardcoded Data:** Never rely on existing products or users in the database (except admin credentials).
2. **Setup via API:** If a UI test requires a product, create it via GraphQL in the `beforeEach` hook. It is 10x faster and more reliable than creating it via UI.
3. **Auto-Cleanup (Teardown):** Every created entity (product, category) MUST be deleted in the `afterEach` hook to prevent database pollution.

## 5. Coding Standards & Conventions
- **Comments:** All code comments must be written in English.
- **Test Naming:** Use the `should [do something] when [condition]` format. 
  - *Good:* `should display error message when login with invalid password`
  - *Bad:* `test failed login`
- **Locators:** Prioritize `data-testid` attributes. Fallback to `text` or `role`. Avoid fragile structural selectors like `.div > span:nth-child(2)`.

## 6. Execution & CI/CD Strategy
- **Smoke Suite:** Must run on every Pull Request (PR) in under 3 minutes.
- **Full Regression:** Runs nightly or manually before a release.
- **Parallelization:** Tests must be completely independent to allow `fullyParallel: true` execution in Playwright.

## 7. The "Before You Commit" Checklist
Whenever you write a new test, verify:
- [ ] Did I hardcode any test data instead of generating it?
- [ ] Are there raw CSS selectors in my `tests/` folder?
- [ ] Does this test clean up after itself?
- [ ] If this test fails, will the error clearly state the business feature that broke?

## 8. Stability & Reliability (Anti-Flakiness)
To ensure the trust of the development team in our automation:
- **Automatic Retries:** Enabled only in CI environment (max 2 retries) to catch environmental glitches.
- **Trace Viewer:** Enabled for failed tests to provide a full "post-mortem" (video, snapshots, network logs).
- **Soft Assertions:** Use `expect.soft()` for non-critical UI checks (e.g., checking footer links) to allow the test to continue and gather more information.

## 9. Reporting & Visibility
- **HTML Reports:** Generated after every run, including screenshots of failure points.
- **Metadata:** All tests must be tagged (e.g., `@smoke`, `@regression`, `@api`) for granular execution.
- **CI Integration:** Test results must be visible directly in the Pull Request via GitHub Actions annotations.

## 10. API vs UI Testing Balance (The Pyramid)
- **70% API Tests:** Functional logic, edge cases, negative scenarios (invalid tokens, permissions).
- **30% UI Tests:** Critical user journeys, visual regression, integration between frontend and backend.
- **Rule:** If a bug can be caught via API, we write an API test first. UI tests are reserved for high-value user flows.