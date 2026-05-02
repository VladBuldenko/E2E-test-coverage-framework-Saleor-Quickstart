import { faker } from '@faker-js/faker';
import { CategoryCreateInput } from '../models/category.model.js';

/**
 * Builder class for generating randomized Category data.
 * Implements the fluent builder pattern for overriding specific fields.
 */
export class CategoryBuilder {
    private categoryData: CategoryCreateInput;

    constructor() {
        // Initialize with realistic fake data by default
        this.categoryData = {
            name: faker.commerce.department() + ' ' + faker.string.uuid().substring(0, 5),
            description: faker.lorem.sentence(),
        };
    }

    /**
     * Overrides the randomly generated category name.
     */
    public withName(customName: string): this {
        this.categoryData.name = customName;
        return this;
    }

    /**
     * Explicitly sets a custom slug.
     */
    public withSlug(customSlug: string): this {
        this.categoryData.slug = customSlug;
        return this;
    }

    /**
     * Returns the finalized data object ready for the API request.
     */
    public build(): CategoryCreateInput {
        return this.categoryData;
    }
}