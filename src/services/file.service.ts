import db from "../lib/db";
import type { CreateFileDto, UpdateFileDto, PatchFileDto } from "../dtos/file.dto";

export async function getAllfile(userId: string, search?: string) {
  return db.file.findMany({
    where: {
      userId,
      ...(search ? { content: { contains: search } } : {}),
    },
    orderBy: { date: "desc" },
    include: { category: { select: { name: true, description: true } } },
  });
}

export async function getfileById(id: number, userId: string) {
  const file = await db.file.findUnique({
    where: { id },
    include: { category: { select: { name: true, description: true } } },
  });
  if (!file || file.userId !== userId) return null;
  return file;
}

export async function createFile(userId: string, data: CreateFileDto) {
  return db.file.create({
    data: {
      title: data.title,
      content: data.content,
      color: data.color ?? "#fc03c6",
      date: new Date(),
      isFavorite: data.isFavorite ?? false,
      category_id: data.category_id ?? null,
      userId,
    },
  });
}

export async function updateFile(id: number, userId: string, data: UpdateFileDto) {
  const existing = await db.file.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) return null;
  return db.file.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      color: data.color,
      isFavorite: data.isFavorite ?? false,
      category_id: data.category_id ?? null,
    },
  });
}

export async function patchFile(id: number, userId: string, data: PatchFileDto) {
  const existing = await db.file.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) return null;
  return db.file.update({ where: { id }, data });
}

export async function deleteFile(id: number, userId: string) {
  const existing = await db.file.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) return null;
  await db.file.delete({ where: { id } });
  return true;
}