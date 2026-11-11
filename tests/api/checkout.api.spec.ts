import { test, expect } from '../fixtures/base.fixture.js';

test('shopper can add a product variant to a new checkout', async ({
  productsClient,
  checkoutClient,
}) => {
  const products = await test.step('Browse published products', () =>
    productsClient.listProducts(),
  );

  const selected = products.find(product => product.variants.length > 0);
  expect(selected, 'Seed a published product with a purchasable variant').toBeDefined();

  const product = await test.step('Open the selected product', () =>
    productsClient.getProduct(selected!.id),
  );
  expect(product?.id).toBe(selected!.id);

  const variantId = product?.variants[0]?.id;
  expect(variantId, 'Selected product must have a purchasable variant').toBeTruthy();

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
