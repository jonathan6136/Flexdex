import db from "../lib/db";
import type { CreateCategoryDto, UpdateCategoryDto, PatchCategoryDto } from "../dtos/category.dto";

export async function getAllCategory() {
  return db.category.findMany();
}

export async function getCategoryById(id: number) {
  return db.category.findUnique({ where: { id } });
}

export async function createCategory(data: CreateCategoryDto) {
  return db.category.create({
    data: { name: data.name, description: data.description ?? null },
  });
}

export async function updateCategory(id: number, data: UpdateCategoryDto) {
  return db.category.update({
    where: { id },
    data: { name: data.name, description: data.description ?? null },
  });
}

export async function patchCategory(id: number, data: PatchCategoryDto) {
  return db.category.update({ where: { id }, data });
}

export async function deleteCategory(id: number) {
  await db.category.delete({ where: { id } });
  return true;
}