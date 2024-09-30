import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/Category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(name: string, parentId?: string): Promise<Category> {
    const newCategory = new Category();
    newCategory.name = name;
    if (parentId) {
      const parent = await this.categoryRepository.findOneBy({ id: parentId });
      if (!parent) {
        throw new Error('Invalid parent category ID provided');
      }
      newCategory.parent = parent;
    }
    return await this.categoryRepository.save(newCategory);
  }

  async updateCategory(
    id: string,
    name: string,
  ): Promise<Category | undefined> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      return undefined;
    }
    category.name = name;
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['children'],
    });
    if (!category) {
      return;
    }
    if (category.children.length > 0) {
      throw new Error(
        'Cannot delete category with existing children. Move or delete children first.',
      );
    }
    await this.categoryRepository.delete(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return await this.categoryRepository.findOneBy({ id });
  }
}
