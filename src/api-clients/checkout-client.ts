import { BaseGraphqlClient } from './base-client.js';
import { ENV } from '../utils/config/env.js';

export type Checkout = {
  id: string;
  lines: Array<{
    id: string;
    quantity: number;
    variant: { id: string; name: string };
  }>;
};

export class CheckoutClient extends BaseGraphqlClient {
  async addToCart(variantId: string, quantity = 1): Promise<Checkout> {
    const data = await this.execute<{
      checkoutCreate: {
        checkout: Checkout | null;
        errors: Array<{ message: string | null }>;
      };
    }>(`
      mutation StartCheckout($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            lines { id quantity variant { id name } }
          }
          errors { message }
        }
      }
    `, {
      input: {
        channel: ENV.CHANNEL,
        lines: [{ variantId, quantity }],
      },
    });

    const { checkout, errors } = data.checkoutCreate;
    if (errors.length) {
      throw new Error(`Add to cart failed: ${errors.map(error => error.message).join('; ')}`);
    }
    if (!checkout) throw new Error('Checkout was not created');

    return checkout;
  }
}
