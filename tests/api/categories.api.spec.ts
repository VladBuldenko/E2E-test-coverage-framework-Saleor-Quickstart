import { test, expect } from '../fixtures/base.fixture.js';
import { CategoryBuilder } from '../../src/data/builders/category.builder.js';

test.describe('Category API Operations', () => {
    
    test('Should successfully create a valid category with random data', async ({ categoriesClient }) => {
        // 1. Arrange: Generate unique dynamic data
        const newCategoryData = new CategoryBuilder().build();

        // 2. Act: Send the mutation to Saleor API
        const response = await categoriesClient.createCategory(newCategoryData.name);

        // 3. Assert: Verify the response matches our generated data
        expect(response.id).toBeDefined();
        expect(response.name).toEqual(newCategoryData.name);
    });

    test('Should handle explicit field overrides', async ({ categoriesClient }) => {
        // 1. Arrange: Generate random data but override the name
        const specificData = new CategoryBuilder()
            .withName('Extremely Specific Tech Gadgets')
            .build();

        // 2. Act
        const response = await categoriesClient.createCategory(specificData.name);

        // 3. Assert
        expect(response.name).toEqual('Extremely Specific Tech Gadgets');
    });
});