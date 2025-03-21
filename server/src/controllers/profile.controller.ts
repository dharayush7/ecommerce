import prisma from "@/lib/prisma";
import { Nullable } from "@/types";
import { Request, Response } from "express";

export async function getProfile(req: Request, res: Response) {
  const user = req.user;

  const response = {
    mobileNo: user.mobileNo,
    email: user.email,
    name: user.name,
  };

  res.json({
    msg: "User fetched",
    data: response,
  });
}

export async function updateProfile(req: Request, res: Response) {
  const user = req.user;
  const email = req.body.email as Nullable;
  const name = req.body.name as Nullable;

  if (!name) {
    res.status(400).json({
      msg: "name or email is undefined",
    });
    return;
  }

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
      },
    });

    res.json({
      msg: "Profile updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
