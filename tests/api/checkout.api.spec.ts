import { test, expect } from '../fixtures/base.fixture.js';

test('shopper can add a product variant to a new checkout', async ({
  productsClient,
  checkoutClient,
}) => {
  const products = await test.step('Browse available products', () =>
    productsClient.listProducts(),
  );

  expect(products.length, 'Seed a published product with a purchasable variant').toBeGreaterThan(0);

  // Use a real product from this test environment, not a hardcoded ID.
  let variantId: string | undefined;
  for (const product of products) {
    const details = await productsClient.getProduct(product.id);
    if (details?.variants.length) {
      variantId = details.variants[0].id;
      break;
    }
  }

  expect(variantId, 'Seed at least one published product variant').toBeTruthy();

  const checkout = await test.step('Add one item to the cart', () =>
    checkoutClient.addToCart(variantId!, 1),
  );

  await test.step('Review the cart', async () => {
    expect(checkout.id).toBeTruthy();
    expect(checkout.lines).toHaveLength(1);
    expect(checkout.lines[0].quantity).toBe(1);
    expect(checkout.lines[0].variant.id).toBe(variantId);
  });
});
