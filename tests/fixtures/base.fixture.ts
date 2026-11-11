import { test as base } from '@playwright/test';
import { AuthClient } from '../../src/api-clients/auth-client.js';
import { CategoriesClient } from '../../src/api-clients/category-client.js';
import { CheckoutClient } from '../../src/api-clients/checkout-client.js';
import { ProductsClient } from '../../src/api-clients/products-client.js';

type Fixtures = {
  authClient: AuthClient;
  categoriesClient: CategoriesClient;
  checkoutClient: CheckoutClient;
  productsClient: ProductsClient;
};

export const test = base.extend<Fixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },

  categoriesClient: async ({ request, authClient }, use) => {
    const token = await authClient.getAdminToken();
    await use(new CategoriesClient(request, token));
  },

  checkoutClient: async ({ request }, use) => {
    await use(new CheckoutClient(request));
  },

  productsClient: async ({ request }, use) => {
    await use(new ProductsClient(request));
  },
});

export { expect } from '@playwright/test';
