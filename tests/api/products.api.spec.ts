import { test, expect } from '../fixtures/base.fixture';

test.describe('Saleor Product API', () => {
  
  test('should fetch and verify product names', async ({ adminToken, productsClient }) => {
    
    // Request a list of product names using the abstracted API client to hide GraphQL complexity
    const productNames = await productsClient.getProductNames(5, adminToken);

    // Verify that the catalog contains the default demo data and is not empty
    expect(productNames).toContain('Apple Juice');
    expect(productNames.length).toBeGreaterThan(0);
  });
});