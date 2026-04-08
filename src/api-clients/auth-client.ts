import { BaseGraphqlClient } from './base-client';

/**
 * AuthClient manages authentication procedures with Saleor.
 * It extends BaseGraphqlClient to leverage centralized GraphQL execution logic.
 */
export class AuthClient extends BaseGraphqlClient {
  
  /**
   * Performs a tokenCreate mutation to obtain a JWT access token.
   * Credentials are pulled directly from environment variables for security.
   * @returns {Promise<string>} The JWT access token.
   */
  async getAdminToken(): Promise<string> {
    const loginEmail = process.env.ADMIN_EMAIL;
    const loginPassword = process.env.ADMIN_PASSWORD;

    if (!loginEmail || !loginPassword) {
      throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env file');
    }

    // This is the standard Saleor mutation for authentication
    const AUTH_MUTATION = `
      mutation CreateToken($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
          token
          refreshToken
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

    // We use the inherited 'execute' method from BaseGraphqlClient
    const response = await this.execute(AUTH_MUTATION, variables);

    // GraphQL-level error check for this specific mutation
    const authErrors = response.tokenCreate.errors;
    if (authErrors && authErrors.length > 0) {
      throw new Error(`Authentication failed: ${authErrors[0].message}`);
    }

    const token = response.tokenCreate.token;

    if (!token) {
      throw new Error('Authentication succeeded but no token was returned.');
    }

    return token;
  }
}