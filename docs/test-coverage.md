# Current Coverage

These are **implemented test scenarios**, not confirmed live-environment results.

| Scenario | File | Type |
| --- | --- | --- |
| Staff sign-in succeeds | [auth.api.spec.ts](../tests/api/auth.api.spec.ts) | API |
| Invalid sign-in is rejected | [auth.api.spec.ts](../tests/api/auth.api.spec.ts) | API |
| Admin creates and retrieves a category, then cleans up | [categories.api.spec.ts](../tests/api/categories.api.spec.ts) | API |
| Shopper browses catalog and views details | [products.api.spec.ts](../tests/api/products.api.spec.ts) | API |
| Shopper creates checkout with one product variant | [checkout.api.spec.ts](../tests/api/checkout.api.spec.ts) | API |

## Not implemented

- Dashboard UI login and category management
- Storefront UI product browsing and cart
- Payment and order lifecycle
- Cross-browser UI coverage

Runtime results must come from a local Saleor run of `npm run test:api`. GitHub Actions checks compilation and test discovery only.
