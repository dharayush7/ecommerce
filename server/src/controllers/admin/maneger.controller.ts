import { Request, Response } from "express";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { hashPasword } from "@/lib/password";
import {
  addManegerSchema,
  updateManegerSchema,
  updatePermisionOfManegerSchema,
} from "@/lib/validation";
import { Nullable } from "@/types";

export async function getManegerHandler(req: Request, res: Response) {
  const { permission } = req.admin;

  if (!permission.includes("ADMIN")) {
    res.status(401).json({
      msg: "Access denied",
    });
    return;
  }
  try {
    const user = await prisma.adminUser.findMany({
      select: {
        email: true,
        isOwner: true,
        permission: true,
        name: true,
      },
    });
    res.json({
      msg: "Maneger fetch",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

interface AddManegerHandlerBody {
  name: Nullable;
  email: Nullable;
  mobileNo: Nullable;
  password: Nullable;
  admin: Boolean | undefined | null;
  product: Boolean | undefined | null;
  order: Boolean | undefined | null;
  payment: Boolean | undefined | null;
  customer: Boolean | undefined | null;
  site: Boolean | undefined | null;
}

export async function addManegerHandler(req: Request, res: Response) {
  const {
    name,
    email,
    mobileNo,
    password,
    admin,
    product,
    order,
    payment,
    customer,
    site,
  }: AddManegerHandlerBody = req.body;
  const { permission: adminPersion } = req.admin;

  if (!adminPersion.includes("ADMIN")) {
    res.status(401).json({
      msg: "Access denied",
    });
    return;
  }

  const result = addManegerSchema.safeParse({
    name,
    email,
    mobileNo: Number(mobileNo),
    password,
    admin,
    product,
    order,
    payment,
    customer,
    site,
  });

  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }
  const data = result.data;

  const permission: string[] = [];

  if (data.admin) permission.push("ADMIN");
  if (data.product) permission.push("PRODUCT");
  if (data.order) permission.push("ORDER");
  if (data.payment) permission.push("PAYMENT");
  if (data.customer) permission.push("CUSTOMER");
  if (data.site) permission.push("SITE");

  const hashed = await hashPasword(data.password);

  try {
    const newAdmin = await prisma.adminUser.create({
      data: {
        email: data.email,
        name: data.name,
        permission,
        mobileNo: String(data.mobileNo),
        password: hashed,
      },
      select: {
        email: true,
        isOwner: true,
        permission: true,
        name: true,
      },
    });

    res.json({
      msg: "Maneger created successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

interface UpdateManegerHandlerBody {
  oldEmail: Nullable;
  name: Nullable;
  email: Nullable;
  mobileNo: Nullable;
}

export async function updateManegerHandler(req: Request, res: Response) {
  const { oldEmail, email, name }: UpdateManegerHandlerBody = req.body;
  const { permission: adminPersion } = req.admin;

  if (!adminPersion.includes("ADMIN")) {
    res.status(401).json({
      msg: "Access denied",
    });
    return;
  }

  const result = updateManegerSchema.safeParse({
    email,
    name,
    oldEmail,
  });

  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }
  const data = result.data;
  try {
    const updatedAdmin = await prisma.adminUser.update({
      where: {
        email: data.oldEmail,
      },
      data: {
        email: data.email,
        name: data.name,
      },
      select: {
        email: true,
        isOwner: true,
        permission: true,
        name: true,
      },
    });

    res.json({
      msg: "Maneger updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

interface UpdatePermisionOfMangerBody {
  email: Nullable;
  admin: Boolean | undefined | null;
  product: Boolean | undefined | null;
  order: Boolean | undefined | null;
  payment: Boolean | undefined | null;
  customer: Boolean | undefined | null;
  site: Boolean | undefined | null;
}

export async function updatePermissionOfManegerHandler(
  req: Request,
  res: Response
) {
  const {
    email,
    admin,
    product,
    order,
    payment,
    customer,
    site,
  }: UpdatePermisionOfMangerBody = req.body;
  const { permission: adminPersion } = req.admin;

  if (!adminPersion.includes("ADMIN")) {
    res.status(401).json({
      msg: "Access denied",
    });
    return;
  }

  const result = updatePermisionOfManegerSchema.safeParse({
    email,
    admin,
    product,
    order,
    payment,
    customer,
    site,
  });

  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }

  const data = result.data;
  const permission: string[] = [];

  if (data.admin) permission.push("ADMIN");
  if (data.product) permission.push("PRODUCT");
  if (data.order) permission.push("ORDER");
  if (data.payment) permission.push("PAYMENT");
  if (data.customer) permission.push("CUSTOMER");
  if (data.site) permission.push("SITE");

  try {
    const updateManager = await prisma.adminUser.update({
      where: {
        email: data.email,
      },
      data: {
        permission,
      },
      select: {
        email: true,
        isOwner: true,
        permission: true,
        name: true,
      },
    });

    res.json({
      msg: "Permision updated successfully",
      data: updateManager,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function deleteManegerHandler(req: Request, res: Response) {
  const email = req.body.email as Nullable;
  const { permission: adminPersion } = req.admin;

  if (!adminPersion.includes("ADMIN")) {
    res.status(401).json({
      msg: "Access denied",
    });
    return;
  }

  const result = z.string().email("Invalid email").safeParse(email);

  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }

  const data = result.data;
  try {
    const deletedAdmin = await prisma.adminUser.delete({
      where: {
        email: data,
      },
      select: {
        email: true,
        isOwner: true,
        permission: true,
        name: true,
      },
    });

    res.json({
      msg: "deleted successfully",
      data: deletedAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
