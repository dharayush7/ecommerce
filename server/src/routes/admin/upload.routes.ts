import { Request, Response, Router } from "express";
import prisma from "@/lib/prisma";
import { Nullable } from "@/types";
import uploadMiddleware from "@/middleware/upload.middleware";

async function imageUplaod(req: Request, res: Response) {
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

async function getUnusedMedia(req: Request, res: Response) {
  try {
    const unUsedMedia = await prisma.productImage.findMany({
      where: {
        productId: null,
        createdAt: {
          lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      },
      select: {
        url: true,
      },
    });

    res.json({
      msg: "Unused media fetched",
      date: unUsedMedia.map((e) => e.url),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

async function deleteUnusedMedia(req: Request, res: Response) {
  try {
    await prisma.productImage.deleteMany({
      where: {
        productId: null,
        createdAt: {
          lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      },
    });

    res.json({
      msg: "Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

const router = Router();
router.use(uploadMiddleware);
router.post("/", imageUplaod);
router.get("/unused/get", getUnusedMedia);
router.get("/unused/delete", deleteUnusedMedia);

export default router;
