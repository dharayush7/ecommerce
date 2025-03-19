import { NextFunction, Request, Response } from "express";
import prisma from "@/lib/prisma";

export default async function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const uid = req.headers.authorization?.split(" ")[1];
  if (!uid) {
    res.status(401).json({
      msg: "Session not found",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      uid,
    },
    select: {
      id: true,
      name: true,
      mobileNo: true,
      email: true,
    },
  });

  if (!user) {
    res.status(401).json({
      msg: "Session not found",
    });
    return;
  }

  req.user = user;
  next();
}
