import { BaseGraphqlClient } from './base-client.js';

export type Category = {
  id: string;
  name: string;
};

type MutationResult = {
  errors: Array<{ message: string | null }>;
};

function checkErrors(operation: string, errors: MutationResult['errors']): void {
  if (errors.length) {
    throw new Error(`${operation}: ${errors.map(error => error.message).join('; ')}`);
  }
}

export class CategoriesClient extends BaseGraphqlClient {
  async createCategory(name: string): Promise<Category> {
    const data = await this.execute<{
      categoryCreate: MutationResult & { category: Category | null };
    }>(`
      mutation CreateCategory($name: String!) {
        categoryCreate(input: { name: $name }) {
          category { id name }
          errors { message }
        }
      }
    `, { name });

    checkErrors('Create category', data.categoryCreate.errors);
    if (!data.categoryCreate.category) throw new Error('Created category is missing');
    return data.categoryCreate.category;
  }

  async getCategory(id: string): Promise<Category | null> {
    const data = await this.execute<{ category: Category | null }>(`
      query GetCategory($id: ID!) {
        category(id: $id) { id name }
      }
    `, { id });
    return data.category;
  }

  async deleteCategory(id: string): Promise<void> {
    const data = await this.execute<{
      categoryDelete: MutationResult;
    }>(`
      mutation DeleteCategory($id: ID!) {
        categoryDelete(id: $id) {
          errors { message }
        }
      }
    `, { id });

    checkErrors('Delete category', data.categoryDelete.errors);
  }
}
