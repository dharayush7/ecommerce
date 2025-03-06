import { Request, Response } from "express";
import { Nullable } from "@/types";
import { addProductSchema, updateProductSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

interface AddProductRequest {
  name: Nullable;
  description: Nullable;
  description2: Nullable;
  description3: Nullable;
  points: string[] | null | undefined;
  maxPrice: Nullable;
  sellPrice: Nullable;
  fragrence: Nullable;
  strength: Nullable;
  preference: Nullable;
  sustainable: Nullable;
  type: Nullable;
  idealFor: Nullable;
  quantity: Nullable;
  category: string[] | null | undefined;
  images: string[] | null | undefined;
}

interface UpdateProductRequest {
  id: Nullable;
  name: Nullable;
  description: Nullable;
  description2: Nullable;
  description3: Nullable;
  points: string[] | null | undefined;
  maxPrice: Nullable;
  sellPrice: Nullable;
  fragrence: Nullable;
  strength: Nullable;
  preference: Nullable;
  sustainable: Nullable;
  type: Nullable;
  idealFor: Nullable;
  quantity: Nullable;
  category: string[] | null | undefined;
}

export async function addProductHandler(req: Request, res: Response) {
  const user = req.admin;
  const values: AddProductRequest = req.body;

  if (
    !user.permission.includes("ADMIN") &&
    !user.permission.includes("PRODUCT")
  ) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }
  const result = addProductSchema.safeParse({
    ...values,
    maxPrice: Number(values.maxPrice),
    sellPrice: Number(values.sellPrice),
    quantity: Number(values.quantity),
  });
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0],
    });
    return;
  }

  const { images, category, ...data } = result.data;

  try {
    const result = await prisma.product.create({
      data: {
        ...data,
        images: {
          connect: images?.map((e) => ({ id: e })),
        },
        productOnCategories: {
          create: [...category.map((e) => ({ categoryId: e }))],
        },
      },
    });

    res.json({
      msg: "Product added",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getProductHandler(req: Request, res: Response) {
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
    const data = await prisma.product.findMany();
    res.json({
      msg: "Product fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getProductByIdHandler(req: Request, res: Response) {
  const user = req.admin;
  const productId = req.params.id;

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
    const data = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        productOnCategories: true,
      },
    });

    if (!data) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }

    res.json({
      msg: "Product fetched",
      data: {
        ...data,
        category: data.productOnCategories.map((e) => e.categoryId),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function changeProductStatus(
  req: Request<{ id: string }, {}, {}, { status: string | undefined }>,
  res: Response
) {
  const id = req.params.id;
  const status = req.query.status;
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

  if (!status) {
    res.json({
      msg: "status is undefined",
    });
  }

  try {
    const boolStatus = status === "true";
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isLive: boolStatus,
      },
    });

    res.json({
      msg: "Status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  const user = req.admin;
  const values: UpdateProductRequest = req.body;

  if (
    !user.permission.includes("ADMIN") &&
    !user.permission.includes("PRODUCT")
  ) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  const result = updateProductSchema.safeParse(values);
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0],
    });
    return;
  }

  const { id, category, ...data } = result.data;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        productOnCategories: true,
      },
    });

    if (!product) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        productOnCategories: {
          delete: [
            ...product.productOnCategories.map((e) => ({
              productId_categoryId: {
                categoryId: e.categoryId,
                productId: e.productId,
              },
            })),
          ],
          create: [...category.map((e) => ({ categoryId: e }))],
        },
      },
    });

    res.json({
      msg: "Product updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function updateMediaOfProduct(req: Request, res: Response) {
  const values: { productId: Nullable; image: string[] | null | undefined } =
    req.body;
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

  if (!values.image || !values.productId) {
    res.status(400).json({
      msg: "Update failed",
    });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: values.productId },
      include: { images: true },
    });

    if (!product) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        images: {
          disconnect: product.images.map((e) => ({ id: e.id })),
          connect: values.image.map((e) => ({ id: e })),
        },
      },
    });

    res.json({
      msg: "Product image updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
