import prisma from "@/lib/prisma";
import { Request, Response } from "express";

export async function getUserAdminHandler(req: Request, res: Response) {
  const admin = req.admin;
  if (
    !admin.permission.includes("ADMIN") &&
    !admin.permission.includes("USER")
  ) {
    res.status(401).json({
      msg: "Access Denied",
    });
    return;
  }

  try {
    const user = await prisma.user.findMany({
      select: {
        name: true,
        mobileNo: true,
        email: true,
        isEmailVerified: true,
      },
    });

    res.json({
      msg: "Users fetched",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
