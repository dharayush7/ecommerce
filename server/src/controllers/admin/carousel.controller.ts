import prisma from "@/lib/prisma";
import { addCarouselSchema } from "@/lib/validation";
import { Nullable } from "@/types";
import { Request, Response } from "express";

interface AddCarouselRequest {
  imagesId: string | null | undefined;
  preference: number | null | string;
  link: Nullable;
  isBlack: boolean | null | undefined;
  position: Nullable;
}

export async function addCarousel(req: Request, res: Response) {
  const data = req.body as AddCarouselRequest;
  const result = addCarouselSchema.safeParse(data);
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }

  try {
    const validateData = result.data;
    await prisma.carousel.create({
      data: {
        ...(validateData.isBlack && { isBlack: validateData.isBlack }),
        link: validateData.link,
        images: {
          connect: { id: validateData.imageId },
        },
        preference: Number(validateData.preference),
      },
    });
    res.json({
      msg: "carousel added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
