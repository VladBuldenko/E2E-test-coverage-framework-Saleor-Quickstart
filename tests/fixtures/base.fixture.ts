import { test as base } from '@playwright/test';
import { AuthClient } from '../../src/api-clients/auth-client';

// Define what "tools" will be available in our tests
type MyFixtures = {
  authClient: AuthClient;
  adminToken: string;
};

// Extend the base Playwright test with our custom fixtures
export const test = base.extend<MyFixtures>({
  
  // Fixture for the Auth Client
  authClient: async ({}, use) => {
    const client = new AuthClient();
    await use(client);
  },

  // Fixture that automatically retrieves the token
  adminToken: async ({ authClient }, use) => {
    const token = await authClient.getAdminToken();
    await use(token);
  },
});

export { expect } from '@playwright/test';