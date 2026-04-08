import { request, APIRequestContext, expect } from '@playwright/test';

/**
 * BaseGraphqlClient provides a core interface for interacting with Saleor's GraphQL API.
 * It handles request execution, authorization headers, and error validation.
 */
export class BaseGraphqlClient {
  private readonly endpoint: string;

  constructor() {
    // We pull the API URL from environment variables
    this.endpoint = process.env.API_URL || '';
    
    if (!this.endpoint) {
      throw new Error('API_URL is not defined in the environment variables.');
    }
  }

  /**
   * Executes a GraphQL operation.
   * @param query - The GraphQL query or mutation string.
   * @param variables - An object containing variables for the GraphQL operation.
   * @param token - Optional JWT token for authenticated requests.
   */
  async execute(query: string, variables: object = {}, token?: string) {
    // Creating a fresh request context
    const context: APIRequestContext = await request.newContext({
      baseURL: this.endpoint,
    });

    // All GraphQL requests are POST requests to the same endpoint
    const response = await context.post('', {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `JWT ${token}` }),
      },
      data: {
        query: query,
        variables: variables,
      },
    });

    // Check if the HTTP request itself failed (e.g., 404 or 500)
    expect(response.ok(), `HTTP Request failed with status ${response.status()}`).toBeTruthy();

    const responseBody = await response.json();

    /**
     * CRITICAL: GraphQL specific error handling.
     * GraphQL returns 200 OK even if business logic fails. 
     * We must check the 'errors' field manually.
     */
    if (responseBody.errors) {
      const errorMessage = responseBody.errors
        .map((err: any) => `[Field: ${err.path}] ${err.message}`)
        .join('\n');
      
      throw new Error(`GraphQL Errors detected:\n${errorMessage}`);
    }

    return responseBody.data;
  }
}