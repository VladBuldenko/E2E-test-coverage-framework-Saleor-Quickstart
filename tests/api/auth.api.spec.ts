import { test, expect } from '../fixtures/base.fixture.js';

test('admin can sign in with valid credentials', async ({ authClient }) => {
  const token = await authClient.getAdminToken();
  expect(token.length).toBeGreaterThan(20);
});

test('sign-in rejects invalid credentials', async ({ authClient }) => {
  const result = await authClient.signIn(
    `unknown-${Date.now()}@example.invalid`,
    'incorrect-password',
  );

  expect(result.token).toBeNull();
  expect(result.errors.length).toBeGreaterThan(0);
});
