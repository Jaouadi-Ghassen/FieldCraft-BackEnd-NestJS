import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from '../../entities/Category.entity';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category, { nullable: true })
  async category(
    @Args('id') id: string,
  ): Promise<Pick<Category, 'id' | 'name' | 'parent' | 'children'>> {
    const category = await this.categoryService.getCategoryById(id);
    return category;
  }

  @Query(() => [Category], { nullable: 'items' })
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('name') name: string,
    @Args('parentId', { nullable: true }) parentId?: string,
  ): Promise<Category> {
    return await this.categoryService.createCategory(name, parentId);
  }

  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Args('id') id: string,
    @Args('name') name: string,
  ): Promise<Category | undefined> {
    return await this.categoryService.updateCategory(id, name);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string): Promise<boolean> {
    await this.categoryService.deleteCategory(id);
    return true;
  }
}
