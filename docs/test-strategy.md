# Test Strategy

## Goal

Keep a small suite of meaningful checks around the main Saleor journeys. Prefer simple code and useful failures over broad but unreliable coverage.

## Priorities

1. **Authentication:** staff credentials work; invalid credentials are rejected.
2. **Catalog administration:** admin can create and retrieve a category; test data is cleaned up.
3. **Shopping:** a customer can browse products, open details, and add a purchasable variant to a checkout.
4. **Browser journeys (next):** use the real Storefront and Dashboard UI after routes and locators have been verified locally.

## Test design

- Each test stands on its own. Avoid tests that depend on another test's output.
- Keep requests in small GraphQL clients, assertions in tests.
- Use unique data for mutations and clean it up where the API permits.
- Never assert that arbitrary demo products such as `Apple Juice` exist.
- Require published, purchasable catalog seed data for storefront API tests.
- Test one user goal per scenario; report steps in plain English.
- Use Playwright's built-in waiting; do not add sleeps, polling loops, or custom retries.

## Execution

- **Retries:** 0, including CI.
- **Workers:** 1 for predictable local integration tests.
- **Evidence:** HTML report and trace on failure.
- **CI:** TypeScript checks and test discovery only, until an isolated Saleor environment is provisioned.
- **Environment:** Local disposable Saleor instance. Do not point mutation tests at production.

## Known limits

- The current suite checks GraphQL API workflows, not UI interactions.
- Checkout creation stops before payment or order placement.
- Anonymous checkout records can remain until Saleor expires them.
- Runtime pass/fail against a live Saleor instance must be verified locally.
