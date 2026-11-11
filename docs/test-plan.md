# Test Plan

**System under test:** Local Saleor Quickstart GraphQL API

## Entry conditions

- Saleor API responds at `API_URL`.
- `SALEOR_CHANNEL` exists and has a published, purchasable product variant.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` belong to a staff user allowed to manage categories.
- The instance is isolated and disposable.

## Scenarios

| Priority | Area | Expected outcome |
| --- | --- | --- |
| P0 | Staff sign-in | Valid credentials return a token |
| P0 | Invalid sign-in | Unknown user is rejected |
| P0 | Admin category | Create, retrieve, and remove a category |
| P0 | Catalog browsing | Published product listing and selected product details agree |
| P0 | Add to cart | Creating an anonymous checkout produces exactly one requested line |

## Exit conditions

- No failed P0 scenarios in the local test environment.
- Created categories are removed by the tests.
- Failures are understandable from the assertion and HTML report.
- No retries used to turn failures into passes.

## Out of scope for this slice

Browser UI testing, payments, order placement, refunds, visual regression, performance testing, and security scanning. These need their own verified test environments and scenarios.

The GitHub Actions workflow validates code structure and test discovery only; it is **not** evidence that Saleor integration tests passed.
