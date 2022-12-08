import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AllCategoriesOutput } from './dto/allCategories.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './dto/create-category.dto';
import { DelCategoryInput, DelCategoryOutput } from './dto/del-category.dto';
import { SeeCategoryInput, SeeCategoryOutput } from './dto/see-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory({
    name,
  }: CreateCategoryInput): Promise<CreateCategoryOutput> {
    try {
      await this.prisma.category.create({ data: { name } });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async updateCategory({
    name,
    categoryId,
  }: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    try {
      await this.prisma.category.update({
        where: { id: categoryId },
        data: { name },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async delCategory({
    categoryId,
  }: DelCategoryInput): Promise<DelCategoryOutput> {
    try {
      await this.prisma.category.delete({
        where: { id: categoryId },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.prisma.category.findMany({
        select: { id: true, name: true },
      });
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async seeCategory({
    categoryId,
  }: SeeCategoryInput): Promise<SeeCategoryOutput> {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
        include: { videos: true },
      });
      return {
        ok: true,
        category,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
