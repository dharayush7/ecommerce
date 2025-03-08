import prisma from "@/lib/prisma";
import { Request, Response } from "express";

export async function getTagHandler(req: Request, res: Response) {
  try {
    const tags = await prisma.category.findMany({
      where: {
        isTag: true,
      },
      select: {
        name: true,
        id: true,
      },
    });

    res.json({
      msg: "Tag fetched",
      data: tags,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
