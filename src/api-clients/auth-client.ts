import { BaseGraphqlClient } from './base-client.js';
import { ENV } from '../utils/config/env.js';

type LoginResult = {
  token: string | null;
  errors: Array<{ field: string | null; message: string | null }>;
};

const TOKEN_CREATE = `
  mutation SignIn($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      errors { field message }
    }
  }
`;

export class AuthClient extends BaseGraphqlClient {
  async signIn(email: string, password: string): Promise<LoginResult> {
    const data = await this.execute<{ tokenCreate: LoginResult }>(TOKEN_CREATE, {
      email,
      password,
    });
    return data.tokenCreate;
  }

  async getAdminToken(): Promise<string> {
    if (!ENV.ADMIN_EMAIL || !ENV.ADMIN_PASSWORD) {
      throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to run admin tests');
    }

    const result = await this.signIn(ENV.ADMIN_EMAIL, ENV.ADMIN_PASSWORD);
    if (result.errors.length || !result.token) {
      throw new Error(`Admin sign-in failed: ${result.errors.map(error => error.message).join('; ') || 'missing token'}`);
    }

    return result.token;
  }
}
