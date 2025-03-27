import prisma from "@/lib/prisma";
import { userLoginSchema } from "@/lib/validation";
import { Nullable } from "@/types";
import { Request, Response } from "express";

export async function loginHandler(req: Request, res: Response) {
  const mobileNo = req.body.mobileNo as Nullable;
  const uid = req.body.uid as Nullable;
  let result;
  try {
    result = userLoginSchema.safeParse({ mobileNo: Number(mobileNo), uid });
    if (!result.success) {
      res.status(400).json({
        msg: result.error.issues[0].message,
      });
      return;
    }
  } catch (error) {
    result = null;
    res.status(400).json({
      msg: "Phone number imvalid",
    });
    return;
  }
  const data = result.data;
  result = null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        mobileNo: String(data.mobileNo),
      },
    });
    if (user) {
      res.json({
        msg: "Authenticate",
        data: user,
      });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        mobileNo: String(data.mobileNo),
        uid: data.uid,
      },
    });
    res.json({
      msg: "User Saved",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
