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

export async function getProductByCategory(req: Request, res: Response) {
  const categoryId = req.params.id;
  try {
    const listOfProduct = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        productOnCategories: {
          select: {
            product: {
              include: {
                images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!listOfProduct) {
      res.json(400).json({
        msg: "Category not found",
      });
      return;
    }

    res.json({
      msg: "Products fetched",
      data: listOfProduct.productOnCategories.map((e) => e.product),
      category: {
        name: listOfProduct.name,
        id: listOfProduct.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
