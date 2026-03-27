import express, { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import db from "../lib/db";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

async function getUserId(req: Request): Promise<string | null> { ... }

router.get("/", async (req: Request, res: Response) => {
});

router.get("/:id", async (req: Request, res: Response) => {
}); 

router.post("/", async (req: Request, res: Response) => {
});

router.put("/:id", async (req: Request, res: Response) => {
});             

router.patch("/:id", async (req: Request, res: Response) => {
});

router.delete("/:id", async (req: Request, res: Response) => {
});

export default router;
router.use(authMiddleware);