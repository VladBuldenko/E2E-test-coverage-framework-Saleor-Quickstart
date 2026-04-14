import { request, APIRequestContext } from '@playwright/test';

/**
 * BaseGraphqlClient provides a core interface for interacting with Saleor's GraphQL API.
 * It handles request execution, authorization headers, and multi-layer error validation.
 */
export class BaseGraphqlClient {
  /**
   * Protected access allows child classes (e.g., AuthClient) to access the endpoint.
   */
  protected readonly endpoint: string;

  /**
   * @param endpoint - The full URL to the GraphQL API (e.g., http://localhost:8000/graphql/).
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    
    // Fail Fast: Validate configuration during instantiation
    if (!this.endpoint) {
      throw new Error('BaseGraphqlClient: API endpoint URL is missing. Check your environment configuration.');
    }
  }

  /**
   * Executes a GraphQL operation with built-in error handling.
   * @param query - The GraphQL query or mutation string.
   * @param variables - Object containing variables for the operation.
   * @param token - Optional JWT token for authorized requests.
   */
  async execute(query: string, variables: object = {}, token?: string) {
    // 1. Initialize Request Context
    const context: APIRequestContext = await request.newContext({
      baseURL: this.endpoint,
    });

    // 2. Act: Send the POST request
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

    // 3. Fail Fast: Check HTTP Transport Layer (Network/Server availability)
    if (!response.ok()) {
      throw new Error(
        `HTTP Error: Request failed with status ${response.status()} (${response.statusText()})`
      );
    }

    // 4. Parse JSON body
    const responseBody = await response.json();

    /**
     * 5. Fail Fast: Check GraphQL Business Logic Layer.
     * GraphQL returns 200 OK even for failed logic. We must manually check the 'errors' field.
     */
    if (responseBody.errors && responseBody.errors.length > 0) {
      const errorMessage = responseBody.errors
        .map((err: any) => `[Path: ${err.path}] ${err.message}`)
        .join('\n');
      
      throw new Error(`GraphQL Logic Error: The server returned specific errors:\n${errorMessage}`);
    }

    // 6. Return clean data if all checks passed
    return responseBody.data;
  }
}