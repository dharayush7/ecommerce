import prisma from "@/lib/prisma";
import { Category } from "prisma/prisma-client";
import { Request, Response } from "express";

interface GetProduct {
  id: string;
  name: string;
  sellPrice: number;
  maxPrice: number;
  categories: Pick<Category, "id" | "name">[];
  tags: Pick<Category, "id" | "name">[];
}

export async function getProducthandler(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      include: {
        productOnCategories: {
          include: {
            category: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    const resBody: GetProduct[] = [];

    products.map((prd) => {
      const categories: Pick<Category, "id" | "name">[] = [];
      const tags: Pick<Category, "id" | "name">[] = [];

      prd.productOnCategories.map((e) => {
        if (e.category.isTag)
          categories.push({ name: e.category.name, id: e.category.id });
        else tags.push({ name: e.category.name, id: e.category.id });
      });

      resBody.push({
        id: prd.id,
        name: prd.name,
        sellPrice: prd.sellPrice,
        maxPrice: prd.maxPrice,
        tags: categories,
        categories: tags,
      });
    });

    res.json({
      msg: "Product fetched",
      data: resBody,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
