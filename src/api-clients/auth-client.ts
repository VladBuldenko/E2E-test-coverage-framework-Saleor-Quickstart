import { BaseGraphqlClient } from './base-client.js';
import { ENV } from '../utils/config/env.js'; 

/**
 * Interface for the tokenCreate response structure.
 * Helps to avoid 'any' and provides autocomplete.
 */
interface AuthResponse {
  tokenCreate: {
    token: string | null;
    errors: Array<{ field: string; message: string }>;
  };
}

export class AuthClient extends BaseGraphqlClient {
  
  // Передаем URL снаружи, это делает класс независимым от окружения
  constructor(endpoint: string = ENV.API_URL) {
    super(endpoint);
  }

  async getAdminToken(): Promise<string> {
    const loginEmail = ENV.ADMIN_EMAIL;
    const loginPassword = ENV.ADMIN_PASSWORD;

    if (!loginEmail || !loginPassword) {
      throw new Error('CONFIG ERROR: Credentials missing in ENV object');
    }

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

    // Теперь мы говорим TS, что ответ будет соответствовать AuthResponse
    const response = await this.execute(AUTH_MUTATION, {
      email: loginEmail,
      password: loginPassword,
    }) as AuthResponse;

    const { token, errors } = response.tokenCreate;

    if (errors && errors.length > 0) {
      throw new Error(`AUTH ERROR: [${errors[0].field}] ${errors[0].message}`);
    }

    if (!token) {
      throw new Error('AUTH ERROR: Token is missing in the response.');
    }

    return token;
  }
}