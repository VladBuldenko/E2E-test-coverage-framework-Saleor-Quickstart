import { request, APIRequestContext } from '@playwright/test';
import { ENV } from '../utils/config/env.js';

/**
 * Core abstract class for GraphQL interaction.
 * Implements a layered validation strategy to distinguish between 
 * network, transport, and business logic errors.
 */
export abstract class BaseGraphqlClient {
  /**
   * The API endpoint is resolved from centralized environment configuration.
   */
  protected readonly endpoint: string = ENV.API_URL;

  /**
   * @param token - Optional administrative JWT. If provided, used as a default 
   * for all operations within this client instance.
   */
  constructor(protected token?: string) {
    /**
     * Fail-Fast Principle: Validate configuration at instantiation time 
     * to avoid cryptic errors during test execution.
     */
    if (!this.endpoint) {
      throw new Error('BaseGraphqlClient: API_URL is not defined in environment variables.');
    }
  }

  /**
   * Orchestrates the execution of a GraphQL operation.
   * 
   * @param query - Valid GraphQL query or mutation string.
   * @param variables - Key-value pairs for GraphQL variables.
   * @param overrideToken - Specific token to use for this call only (bypasses constructor token).
   * @returns The 'data' payload extracted from the successful GraphQL response.
   * @throws {Error} If any layer of validation (HTTP, Network, or GraphQL Logic) fails.
   */
  async execute(query: string, variables: object = {}, overrideToken?: string) {
    const tokenToUse = overrideToken || this.token;

    // Create a dedicated request context for each execution to ensure isolation.
    const context: APIRequestContext = await request.newContext({
      baseURL: this.endpoint,
    });

    /**
     * Layer 1: HTTP Transport Execution
     */
    const response = await context.post('', {
      headers: {
        'Content-Type': 'application/json',
        /**
         * Saleor specific: Authorization requires 'JWT' prefix.
         * Conditional inclusion of the header prevents sending 'Authorization: undefined'.
         */
        ...(tokenToUse && { 'Authorization': `JWT ${tokenToUse}` }),
      },
      data: { query, variables },
    });

    /**
     * Layer 2: HTTP Status Validation
     * Handles non-2xx status codes (e.g., 404 Not Found, 500 Server Error).
     */
    if (!response.ok()) {
      throw new Error(
        `HTTP Transport Error: Received ${response.status()} ${response.statusText()} from ${this.endpoint}`
      );
    }

    const responseBody = await response.json();

    /**
     * Layer 3: GraphQL Business Logic Validation
     * Crucial: GraphQL servers often return 200 OK even for failed operations.
     * We must manually parse the 'errors' array to identify logic failures (e.g., permission denied).
     */
    if (responseBody.errors && responseBody.errors.length > 0) {
      const errorMessage = responseBody.errors
        .map((err: any) => `[Path: ${err.path}] ${err.message}`)
        .join('\n');
      
      throw new Error(`GraphQL Business Logic Error:\n${errorMessage}`);
    }

    // Success path: Return clean data to the high-level client.
    return responseBody.data;
  }
}