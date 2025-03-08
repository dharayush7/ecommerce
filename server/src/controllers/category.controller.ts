import prisma from "@/lib/prisma";
import { Request, Response } from "express";

export async function getCategoryHandler(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isTag: false,
      },
      select: {
        name: true,
        id: true,
      },
    });

    res.json({
      msg: "Categories fetched",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
