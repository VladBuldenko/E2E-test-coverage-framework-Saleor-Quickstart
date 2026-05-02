import { BaseGraphqlClient } from './base-client.js';

/**
 * Interface defining the shape of a basic Product object.
 * This acts as a 'contract' for our data.
 */
export interface ProductBasic {
  id: string;
  name: string;
  slug: string;
}

/**
 * ProductsClient handles all product-related API calls.
 */
export class ProductsClient extends BaseGraphqlClient {
  
  private readonly GET_PRODUCTS_QUERY = `
    query GetProducts($first: Int, $channel: String!) {
      products(first: $first, channel: $channel) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `;

  /**
   * Fetches a list of products.
   * @param count - Number of products to return.
   */
  async getProducts(count: number = 5): Promise<ProductBasic[]> {
    const variables = { 
      first: count, 
      channel: "default-channel" 
    };

    const response = await this.execute(this.GET_PRODUCTS_QUERY, variables);
    
    if (!response?.products?.edges) {
      throw new Error('ProductsClient: Invalid response structure.');
    }

    return response.products.edges.map((edge: any) => edge.node);
  }
}