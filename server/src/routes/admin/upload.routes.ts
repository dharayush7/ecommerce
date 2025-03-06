import { Request, Response, Router } from "express";
import prisma from "@/lib/prisma";
import { Nullable } from "@/types";

export async function imageUplaod(req: Request, res: Response) {
  const url = req.body.url as Nullable;

  if (!url) {
    res.status(400).json({
      msg: "url invalid",
    });
    return;
  }

  try {
    const media = await prisma.productImage.create({
      data: { url },
    });

    res.json({
      msg: "Media uploaded",
      data: {
        mediaId: media.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

const router = Router();
router.post("/", imageUplaod);

export default router;
