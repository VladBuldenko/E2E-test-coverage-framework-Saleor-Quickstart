import { randomUUID } from 'node:crypto';
import { test, expect } from '../fixtures/base.fixture.js';

test('admin can create and view a category', async ({ categoriesClient }) => {
  const name = `QA Category ${randomUUID().slice(0, 8)}`;
  const created = await test.step('Create a category', () =>
    categoriesClient.createCategory(name),
  );

  try {
    await test.step('Open the new category', async () => {
      const category = await categoriesClient.getCategory(created.id);
      expect(category).toEqual({ id: created.id, name });
    });
  } finally {
    // Leave the catalog as it was before the test.
    await categoriesClient.deleteCategory(created.id);
  }
});
