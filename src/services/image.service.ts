import db from "../lib/db";
import cloudinary from "../lib/cloudinary";

export async function uploadImage(userId: string, fileBuffer: Buffer) {
  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `docknotes/${userId}`,
          transformation: [
            { width: 1920, crop: "limit" },
            { quality: "auto", fetch_format: "webp" },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload échoué"));
          } else {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          }
        }
      );
      stream.end(fileBuffer);
    }
  );

  return db.image.create({
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      userId,
    },
  });
}

export async function getAllImages(userId: string) {
  return db.image.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteImage(id: number, userId: string) {
  const existing = await db.image.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) return null;
  await cloudinary.uploader.destroy(existing.publicId);
  await db.image.delete({ where: { id } });
  return true;
}

