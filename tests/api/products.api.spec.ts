import { test, expect } from '../fixtures/base.fixture';

test.describe('Saleor Product & Category API', () => {
  
  test('should fetch and verify product names', async ({ productsClient }) => {
    // Look! No adminToken here. The client already has it from the fixture.
    const products = await productsClient.getProducts(5);

    // Better assertion: check if we got actual objects
    expect(products.length).toBeGreaterThan(0);
    
    // Check if a specific product exists in the list (using map for names)
    const productNames = products.map(p => p.name);
    expect(productNames).toContain('Apple Juice');
  });

  test('should create a new category', async ({ categoriesClient, adminToken }) => {
    const uniqueName = `Category_${Date.now()}`;
    
    // Again, no token needed. The 'categoriesClient' is already authorized.
    const category = await categoriesClient.createCategory(uniqueName, adminToken);
  
    expect(category.name).toBe(uniqueName);
    expect(category.id).toBeDefined();
  });
});