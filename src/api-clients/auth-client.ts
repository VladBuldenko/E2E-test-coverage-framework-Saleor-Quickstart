import { BaseGraphqlClient } from './base-client';

/**
 * AuthClient manages authentication procedures with Saleor.
 * It extends BaseGraphqlClient to leverage centralized GraphQL execution logic.
 */
export class AuthClient extends BaseGraphqlClient {
  
  constructor() {
    super(process.env.BASE_URL || '');
  }

  /**
   * Performs a tokenCreate mutation to obtain a JWT access token.
   * @returns {Promise<string>} The JWT access token.
   */
  async getAdminToken(): Promise<string> {
    // 1. Get credentials from environment
    const loginEmail = process.env.ADMIN_EMAIL;
    const loginPassword = process.env.ADMIN_PASSWORD;

    // 2. GLOBAL CHECK (Fail Fast): Exit immediately if config is broken
    if (!loginEmail || !loginPassword) {
      throw new Error('CONFIG ERROR: ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env file');
    }

    // 3. PREPARE: Define the business logic of the request
    const AUTH_MUTATION = `
      mutation CreateToken($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
          token
          errors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      email: loginEmail,
      password: loginPassword,
    };

    // 4. EXECUTE: Call the inherited method
    const response = await this.execute(AUTH_MUTATION, variables);

    // 5. DATA VALIDATION: Check for GraphQL-level business errors
    const errors = response?.tokenCreate?.errors;
    if (errors && errors.length > 0) {
      throw new Error(`AUTH ERROR: ${errors[0].message}`);
    }

    // 6. FINAL CHECK: Ensure the token exists
    const token = response?.tokenCreate?.token;
    if (!token) {
      throw new Error('AUTH ERROR: Authentication succeeded but token is null.');
    }

    return token;
  }
}