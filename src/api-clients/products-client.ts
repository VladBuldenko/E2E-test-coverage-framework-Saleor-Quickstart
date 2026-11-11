import { BaseGraphqlClient } from './base-client.js';
import { ENV } from '../utils/config/env.js';

type Variant = { id: string; name: string };

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  variants: Variant[];
};

export class ProductsClient extends BaseGraphqlClient {
  async listProducts(first = 20): Promise<ProductSummary[]> {
    const data = await this.execute<{
      products: { edges: Array<{ node: ProductSummary }> };
    }>(`
      query BrowseProducts($first: Int!, $channel: String!) {
        products(first: $first, channel: $channel) {
          edges {
            node { id name slug variants { id name } }
          }
        }
      }
    `, { first, channel: ENV.CHANNEL });

    return data.products.edges.map(edge => edge.node);
  }

  async getProduct(id: string): Promise<ProductSummary | null> {
    const data = await this.execute<{ product: ProductSummary | null }>(`
      query ViewProduct($id: ID!, $channel: String!) {
        product(id: $id, channel: $channel) {
          id
          name
          slug
          variants { id name }
        }
      }
    `, { id, channel: ENV.CHANNEL });

    return data.product;
  }
}
