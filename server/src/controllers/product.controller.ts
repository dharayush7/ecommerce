import prisma from "@/lib/prisma";
import { Category } from "prisma/prisma-client";
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
        description: prd.description,
        images: prd.images.map((e) => e.url),
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

export async function getProductById(req: Request, res: Response) {
  const productId = req.params.id;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        productOnCategories: {
          select: {
            category: {
              select: {
                id: true,
                isTag: true,
                name: true,
              },
            },
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }
    const suggestedProduct = await prisma.productOnCategories.findMany({
      where: {
        categoryId: {
          in: [...product.productOnCategories.map((e) => e.category.id)],
        },
      },
      include: {
        product: {
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
        },
      },
      distinct: "productId",
    });

    const resBody: GetProduct[] = [];

    suggestedProduct.map((prd) => {
      const categories: Pick<Category, "id" | "name">[] = [];
      const tags: Pick<Category, "id" | "name">[] = [];

      prd.product.productOnCategories.map((e) => {
        if (e.category.isTag)
          categories.push({ name: e.category.name, id: e.category.id });
        else tags.push({ name: e.category.name, id: e.category.id });
      });

      resBody.push({
        id: prd.product.id,
        name: prd.product.name,
        sellPrice: prd.product.sellPrice,
        maxPrice: prd.product.maxPrice,
        description: prd.product.description,
        tags: categories,
        categories: tags,
        images: prd.product.images.map((e) => e.url),
      });
    });

    res.json({
      msg: "Product fetched",
      data: {
        product: product,
        suggestedProduct: resBody,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
