import { BaseGraphqlClient } from './base-client';

/**
 * ProductsClient manages all product-related operations in Saleor.
 * It abstracts complex GraphQL structures like edges and nodes into simple methods.
 */
export class ProductsClient extends BaseGraphqlClient {
  
  /**
   * Private GraphQL query for fetching products.
   * Centralizing the query here prevents duplication across multiple tests (DRY).
   */
  private readonly GET_PRODUCTS_QUERY = `
    query GetProducts($first: Int) {
      products(first: $first) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  /**
   * Fetches an array of product names.
   * @param count - Number of products to retrieve.
   * @param token - Valid JWT token for authentication.
   * @returns A promise that resolves to an array of strings (product names).
   */
  async getProductNames(count: number = 5, token: string): Promise<string[]> {
    const response = await this.execute(this.GET_PRODUCTS_QUERY, { first: count }, token);
    
    if (!response.products || !response.products.edges) {
      throw new Error('ProductsClient: Failed to retrieve product list or response structure is invalid.');
    }

    // Mapping complex GraphQL edges/nodes to a simple string array
    return response.products.edges.map((edge: any) => edge.node.name);
  }
}