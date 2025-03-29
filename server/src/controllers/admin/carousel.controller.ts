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
  const user = req.admin;
  if (!user.permission.includes("ADMIN") && !user.permission.includes("SITE")) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }
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

export async function getCarousel(req: Request, res: Response) {
  const user = req.admin;
  if (!user.permission.includes("ADMIN") && !user.permission.includes("SITE")) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  try {
    const data = await prisma.carousel.findMany({
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    res.json({
      msg: "Carousel fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function deleteCarousel(req: Request, res: Response) {
  const user = req.admin;
  const carouselId = req.body.carouselId as Nullable;

  if (!user.permission.includes("ADMIN") && !user.permission.includes("SITE")) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  if (!carouselId) {
    res.status(400).json({
      msg: "Carousel Id not found",
    });
    return;
  }

  try {
    const carousel = await prisma.carousel.findUnique({
      where: {
        id: carouselId,
      },
    });

    if (!carousel) {
      res.status(400).json({
        msg: "Carousel not found",
      });
      return;
    }

    await prisma.carousel.delete({
      where: {
        ...carousel,
      },
    });

    res.json({
      msg: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
