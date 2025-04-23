import prisma from "@/lib/prisma";
import { Nullable } from "@/types";
import { Request, Response } from "express";

export async function wishlistCURD(req: Request, res: Response) {
  const user = req.user;
  const productId = req.body.productId as Nullable;

  if (!productId) {
    res.status(400).json({
      msg: "Product Id is not found",
    });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      res.status(400).json({
        msg: "Product is not found",
      });
    }

    const wishlist = await prisma.productOnWishList.findUnique({
      where: {
        userId_productId: {
          productId,
          userId: user.id,
        },
      },
    });

    if (!wishlist) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          productOnWishList: {
            create: [{ productId }],
          },
        },
      });
    } else {
      await prisma.productOnWishList.delete({
        where: {
          userId_productId: {
            productId,
            userId: user.id,
          },
        },
      });
    }

    res.json({
      msg: "Wishlist updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getWishlistHandler(req: Request, res: Response) {
  const user = req.user;

  try {
    const data = await prisma.productOnWishList.findMany({
      where: {
        userId: user.id,
      },
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
    });
    res.json({
      msg: "Wishlist Fetched",
      data: data.map((e) => e.product),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
