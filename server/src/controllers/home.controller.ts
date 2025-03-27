import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { Request, Response } from "express";

interface GetProduct {
  id: string;
  name: string;
  description: string;
  sellPrice: number;
  maxPrice: number;
  images: string[];
  categories: Pick<Category, "id" | "name">[];
  tags: Pick<Category, "id" | "name">[];
}

export async function getData(req: Request, res: Response) {
  try {
    const [products, carousel] = await Promise.all([
      await prisma.product.findMany({
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
      }),
      await prisma.carousel.findMany({
        orderBy: {
          preference: "asc",
        },
      }),
    ]);

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
        description: prd.description,
        tags: categories,
        categories: tags,
        images: prd.images.map((e) => e.url),
      });
    });

    res.json({
      msg: "Product fetched",
      data: {
        products: resBody,
        carousel,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
