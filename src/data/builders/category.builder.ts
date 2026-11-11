import { faker } from '@faker-js/faker';

export function newCategoryName(): string {
  return `QA ${faker.commerce.department()} ${faker.string.alphanumeric(8)}`;
}
