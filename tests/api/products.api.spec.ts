import { test, expect } from '../fixtures/base.fixture.js';

test('shopper can browse the catalog and view product details', async ({ productsClient }) => {
  const products = await test.step('Browse published products', () =>
    productsClient.listProducts(),
  );

  expect(products.length, 'Seed at least one published product in the test channel').toBeGreaterThan(0);

  const selected = products[0];
  expect(selected.id).toBeTruthy();
  expect(selected.name).toBeTruthy();
  expect(selected.slug).toBeTruthy();

  await test.step('Open the selected product', async () => {
    const details = await productsClient.getProduct(selected.id);
    expect(details).not.toBeNull();
    expect(details).toMatchObject({
      id: selected.id,
      name: selected.name,
      slug: selected.slug,
    });
  });
});
