import {z} from "zod/v4";

export const createFileDto = z.object({  
  title: z.string().min(1, "Le titre est obligatoire").max(50),
  content: z.string().min(1, "Le contenu est obligatoire").max(500),
  color: z.string().max(50).optional(),
  isFavorite: z.boolean().optional(),
  category_id: z.number().int().positive().nullable().optional(),
});

export const updateFileDto = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(50),
  content: z.string().min(1, "Le contenu est obligatoire").max(500),
  color: z.string().min(1, "La couleur est obligatoire").max(50),
  isFavorite: z.boolean().optional(),
  category_id: z.number().int().positive().nullable().optional(),
});

export const patchFileDto = z.object({
  title: z.string().min(1).max(50).optional(),
  content: z.string().min(1).max(500).optional(),
  color: z.string().min(1).max(50).optional(),
  date: z.coerce.date().optional(),
  isFavorite: z.boolean().optional(),
  category_id: z.number().int().positive().nullable().optional(),
});

export type CreateFileSchema = z.infer<typeof createFileDto>;
export type UpdateFileSchema = z.infer<typeof updateFileDto>;
export type PatchFileSchema = z.infer<typeof patchFileDto>;