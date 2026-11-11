# Saleor Test Automation

A small, practical Playwright + TypeScript framework for testing a locally running [Saleor](https://github.com/saleor/saleor) store.

The goal is readable tests that follow real actions, not layers of helpers or retries that hide failures.

## Covered scenarios

| Area | Scenario | Status |
| --- | --- | --- |
| Authentication | Staff login and rejected invalid credentials | Automated |
| Catalog management | Admin creates and opens a category; test data is deleted afterward | Automated |
| Storefront API | Shopper browses published products and opens product details | Automated |
| Cart / checkout | Shopper chooses a product variant and adds one item to a new checkout | Automated |
| Browser UI | Dashboard login, storefront browsing, cart interactions | Not yet automated |

The current suite tests the **GraphQL API**, not the storefront UI. A checkout is created but no order is placed and no payment is made.

## Stack

- Playwright Test and TypeScript
- Saleor GraphQL API
- HTML reports and traces on failure
- GitHub Actions for type checking and test discovery

## Run locally

**Prerequisites:** Node.js 22+, a local Saleor Quickstart instance, a staff account with category permissions, and at least one published, purchasable product variant in your channel.

```bash
git clone https://github.com/VladBuldenko/E2E-test-coverage-framework-Saleor-Quickstart.git
cd E2E-test-coverage-framework-Saleor-Quickstart
npm ci
cp .env.example .env
```

Edit `.env` for your Saleor environment:

```dotenv
API_URL=http://localhost:8000/graphql/
SALEOR_CHANNEL=default-channel
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin
```

Use **only a disposable local/test store**, not production. Never commit `.env`.

```bash
npm run typecheck
npm run test:list
npm run test:api
npm run report
```

The tests run once with no retries. They use a single worker to keep local admin sign-in and shared catalog access predictable. Failures produce a trace and an HTML report.

## Why this structure?

```text
src/
  api-clients/          GraphQL requests and small domain clients
  utils/config/         Environment settings
tests/
  api/                  Business-oriented scenarios
  fixtures/             Playwright clients per test
docs/                   Test strategy, plan, and coverage
```

The tests show *what* happens: sign in, create a category, browse a product, add a variant to the cart. GraphQL operations stay in API clients. A test creates its own category and deletes it even when an assertion fails.

Catalog and checkout tests require **seed data** in the local Saleor instance; they do not assume a product named `Apple Juice` exists. An anonymous checkout may remain until Saleor expires it.

## CI

GitHub Actions runs `npm ci`, `typecheck`, and Playwright test discovery on each push and pull request. API integration tests are **not** run in CI because the workflow does not provision a Saleor instance. Run `npm run test:api` locally against the test store.

## Next step

After a stable local Saleor Dashboard and Storefront are available, add a few **verified browser journeys**, starting with browse product → select variant → cart, using actual accessible locators observed in that application. Do not invent selectors or run UI tests against a public/production store.

See [Test Strategy](docs/test-strategy.md), [Test Plan](docs/test-plan.md), and [Coverage](docs/test-coverage.md).
