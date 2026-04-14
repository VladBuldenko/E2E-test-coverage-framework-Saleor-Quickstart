import { test as base } from '@playwright/test';
import { AuthClient } from '../../src/api-clients/auth-client';

/**
 * Definition of the custom fixtures available in the test context.
 */
type MyFixtures = {
  authClient: AuthClient;
  adminToken: string;
};

/**
 * Extending the base Playwright test with custom domain-specific fixtures.
 * This allows us to inject pre-configured clients and tokens directly into tests.
 */
export const test = base.extend<MyFixtures>({
  
  /**
   * authClient fixture: Provides a fresh instance of AuthClient for each test.
   * It automatically picks up configuration from environment variables via its constructor.
   */
  authClient: async ({}, use) => {
    const client = new AuthClient();
    await use(client);
  },

  /**
   * adminToken fixture: Depends on 'authClient' to retrieve a valid JWT token.
   * This fixture simplifies tests by providing the token directly, 
   * eliminating the need to repeat login logic in every spec file.
   */
  adminToken: async ({ authClient }, use) => {
    // Fail Fast: The getAdminToken method already handles configuration and API errors.
    const token = await authClient.getAdminToken();
    await use(token);
  },
});

export { expect } from '@playwright/test';