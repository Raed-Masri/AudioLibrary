import Category, { Category as CategoryModel } from '../models/Category';

export async function addCategory(name: string, description?: string): Promise<CategoryModel> {
    try {
        const category = new Category({ name, description });
        return await category.save();
    } catch (error) {
        throw error;
    }
}