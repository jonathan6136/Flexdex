import { Request, Response } from "express";
import * as imageService from "../services/image.service";

export async function upload(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Aucune image fournie" });
      return;
    }
    const image = await imageService.uploadImage(req.userId!, req.file.buffer);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}