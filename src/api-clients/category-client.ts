import { BaseGraphqlClient } from './base-client.js';

/**
 * CategoriesClient handles all Category-related operations in Saleor.
 * It follows the API Object Pattern to decouple test logic from GraphQL implementation.
 */
export class CategoriesClient extends BaseGraphqlClient {
  
  /**
   * GraphQL Mutation for creating a category.
   * We use variables ($name) to make the query reusable and secure.
   */
  private readonly CREATE_CATEGORY_MUTATION = `
    mutation CreateCategory($name: String!) {
      categoryCreate(input: { name: $name }) {
        category {
          id
          name
        }
        errors {
          field
          message
        }
      }
    }
  `;

  /**
   * Sends a mutation to create a new category.
   * @param name - The unique name for the new category.
   * @param token - Admin authorization token.
   * @returns The created category object (id and name).
   */
  async createCategory(name: string, token?: string) {
    // 1. Execute the mutation using the inherited 'execute' method
    const response = await this.execute(
      this.CREATE_CATEGORY_MUTATION, 
      { name }, 
      token
    );

    // 2. Business Logic Validation:
    // Saleor might return a 200 OK, but with errors in the body (e.g., "Category already exists").
    // We must check the 'errors' array specifically.
    if (response.categoryCreate.errors && response.categoryCreate.errors.length > 0) {
      const errorMsg = response.categoryCreate.errors[0].message;
      throw new Error(`[CategoriesClient] Failed to create category: ${errorMsg}`);
    }

    // 3. Return only the relevant data to the test
    return response.categoryCreate.category;
  }
}