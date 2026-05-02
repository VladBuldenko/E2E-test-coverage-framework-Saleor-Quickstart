/**
 * Interface representing the input payload required to create a category in Saleor.
 */
export interface CategoryCreateInput {
    name: string;
    description?: string;
    slug?: string;
}