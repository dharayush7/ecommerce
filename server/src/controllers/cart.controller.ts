import prisma from "@/lib/prisma";
import { Nullable } from "@/types";
import { Request, Response } from "express";

export async function addProductToCart(req: Request, res: Response) {
  const user = req.user;
  const productId = req.body.productId as Nullable;
  const qyt = req.body.qyt as number | null | undefined;

  if (!productId || !qyt) {
    res.status(400).json({
      msg: "Product Id or qyt is empty",
    });
    return;
  }

  try {
    const product = prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        productOnCarts: {
          create: [{ productId, quantity: qyt }],
        },
      },
    });
    res.json({
      msg: "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getCartHandler(req: Request, res: Response) {
  const user = req.user;
  try {
    const data = await prisma.productOnCarts.findMany({
      where: {
        userId: user.id,
      },
      select: {
        productId: true,
        quantity: true,
        isSaveForLater: true,
        product: {
          select: {
            name: true,
            description: true,
            sellPrice: true,
            maxPrice: true,
            images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      orderBy: {
        productId: "desc",
      },
    });

    res.json({
      msg: "Cart fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function incrCount(req: Request, res: Response) {
  const user = req.user;
  const productId = req.query.id as Nullable;

  if (!productId) {
    res.status(400).json({
      msg: "Product Id is empty",
    });
    return;
  }

  try {
    const cart = await prisma.productOnCarts.findFirst({
      where: {
        userId: {
          equals: user.id,
        },
        productId: {
          equals: productId,
        },
      },
    });

    if (!cart) {
      res.status(400).json({
        msg: "Cart not found",
      });
      return;
    }

    await prisma.productOnCarts.update({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId,
        },
      },
      data: {
        quantity: cart.quantity + 1,
      },
    });

    res.json({
      msg: "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function decrCount(req: Request, res: Response) {
  const user = req.user;
  const productId = req.query.id as Nullable;

  if (!productId) {
    res.status(400).json({
      msg: "Product Id is empty",
    });
    return;
  }

  try {
    const cart = await prisma.productOnCarts.findFirst({
      where: {
        userId: {
          equals: user.id,
        },
        productId: {
          equals: productId,
        },
      },
    });

    if (!cart) {
      res.status(400).json({
        msg: "Cart not found",
      });
      return;
    }

    if (cart.quantity == 1) {
      res.status(400).json({
        msg: "Item is minimum limit",
      });
      return;
    }

    await prisma.productOnCarts.update({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId,
        },
      },
      data: {
        quantity: cart.quantity - 1,
      },
    });

    res.json({
      msg: "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function removeProductHandler(req: Request, res: Response) {
  const user = req.user;
  const productId = req.body.productId as Nullable;

  if (!productId) {
    res.status(400).json({
      msg: "Product id is empty",
    });
    return;
  }

  try {
    const cart = await prisma.productOnCarts.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    if (!cart) {
      res.status(400).json({
        msg: "Product not found",
      });
      return;
    }

    await prisma.productOnCarts.delete({
      where: {
        userId_productId: {
          productId: cart.productId,
          userId: cart.userId,
        },
      },
    });

    res.json({
      msg: "Item removed from the cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function switchToLater(req: Request, res: Response) {
  const user = req.user;
  const productId = req.query.id as Nullable;

  if (!productId) {
    res.status(400).json({
      msg: "Product id is empty",
    });
    return;
  }
  try {
    const cart = await prisma.productOnCarts.findFirst({
      where: {
        userId: {
          equals: user.id,
        },
        productId: {
          equals: productId,
        },
      },
    });

    if (!cart) {
      res.status(400).json({
        msg: "Cart not found",
      });
      return;
    }

    await prisma.productOnCarts.update({
      where: {
        userId_productId: {
          productId: productId,
          userId: user.id,
        },
      },
      data: {
        isSaveForLater: !cart.isSaveForLater,
      },
    });

    res.json({
      msg: "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
