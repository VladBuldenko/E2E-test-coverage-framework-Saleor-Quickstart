import type { APIRequestContext } from '@playwright/test';
import { ENV } from '../utils/config/env.js';

type GraphqlResponse<T> = {
  data?: T | null;
  errors?: Array<{ message: string }>;
};

export class BaseGraphqlClient {
  constructor(
    protected readonly request: APIRequestContext,
    private readonly token?: string,
  ) {}

  protected async execute<T>(
    query: string,
    variables: Record<string, unknown> = {},
  ): Promise<T> {
    const response = await this.request.post(ENV.API_URL, {
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
      data: { query, variables },
    });

    if (!response.ok()) {
      throw new Error(`Saleor API returned HTTP ${response.status()}`);
    }

    const body = (await response.json()) as GraphqlResponse<T>;
    if (body.errors?.length) {
      throw new Error(`GraphQL error: ${body.errors.map(error => error.message).join('; ')}`);
    }

    if (body.data == null) {
      throw new Error('GraphQL response has no data');
    }

    return body.data;
  }
}
