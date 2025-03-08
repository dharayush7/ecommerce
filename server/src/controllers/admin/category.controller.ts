import prisma from "@/lib/prisma";
import { createCategorySchema, updateCategorySchema } from "@/lib/validation";
import { Nullable } from "@/types";
import { Request, Response } from "express";

export async function createCategory(req: Request, res: Response) {
  const user = req.admin;
  const name = req.body.name as Nullable;
  const desc = req.body.desc as Nullable;
  const isTag = req.body.isTag as boolean | null | undefined;
  if (
    !user.permission.includes("ADMIN") &&
    !user.permission.includes("PRODUCT")
  ) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  const result = createCategorySchema.safeParse({ name, desc, isTag });
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0],
    });
    return;
  }

  const data = result.data;

  try {
    await prisma.category.create({
      data: {
        name: data.name,
        description: data.desc,
        isTag: data.isTag,
      },
    });
    res.json({
      msg: "category created sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const user = req.admin;
  const id = req.body.id as Nullable;
  const name = req.body.name as Nullable;
  const desc = req.body.desc as Nullable;
  const isTag = req.body.isTag as boolean | null | undefined;
  if (
    !user.permission.includes("ADMIN") &&
    !user.permission.includes("PRODUCT")
  ) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  const result = updateCategorySchema.safeParse({ name, desc, id, isTag });
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0],
    });
    return;
  }

  const data = result.data;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!category) {
      res.status(400).json({
        msg: "Category not found",
      });
      return;
    }
    await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: data.name,
        description: data.desc,
        isTag: data.isTag,
      },
    });
    res.json({
      msg: "category updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getCatergory(req: Request, res: Response) {
  const user = req.admin;
  if (
    !user.permission.includes("ADMIN") &&
    !user.permission.includes("PRODUCT")
  ) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  try {
    const categories = await prisma.category.findMany({
      include: {
        productOnCategories: true,
      },
    });
    res.json({
      msg: "Categories fetched",
      data: [
        ...categories.map((e) => ({
          ...e,
          count: e.productOnCategories.length,
        })),
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
