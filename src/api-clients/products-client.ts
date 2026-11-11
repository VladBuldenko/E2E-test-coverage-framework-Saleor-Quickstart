import { BaseGraphqlClient } from './base-client.js';
import { ENV } from '../utils/config/env.js';

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
};

export type ProductDetail = ProductSummary & {
  variants: Array<{ id: string; name: string }>;
};

export class ProductsClient extends BaseGraphqlClient {
  async listProducts(first = 20): Promise<ProductSummary[]> {
    const data = await this.execute<{
      products: { edges: Array<{ node: ProductSummary }> };
    }>(`
      query BrowseProducts($first: Int!, $channel: String!) {
        products(first: $first, channel: $channel) {
          edges { node { id name slug } }
        }
      }
    `, { first, channel: ENV.CHANNEL });

    return data.products.edges.map(edge => edge.node);
  }

  async getProduct(id: string): Promise<ProductDetail | null> {
    const data = await this.execute<{ product: ProductDetail | null }>(`
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
