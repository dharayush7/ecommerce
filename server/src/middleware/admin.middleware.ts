import { NextFunction, Request, Response } from "express";
import prisma from "@/lib/prisma";

interface Admin {
  id: string;
  name: string;
  email: string;
  permission: string[];
  mobileNo: string;
  isOwner: Boolean;
}
export default async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.headers.authorization?.split(" ")[1];
  if (!sessionId) {
    res.status(401).json({
      msg: "Session not found",
    });
    return;
  }
  const session = await prisma.adminSession.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      AdminUser: true,
    },
  });

  if (!session) {
    res.status(401).json({
      msg: "Session not found",
    });
    return;
  }

  const admin: Admin = {
    email: session.AdminUser.email,
    id: session.AdminUser.id,
    isOwner: session.AdminUser.isOwner,
    mobileNo: session.AdminUser.mobileNo,
    name: session.AdminUser.name,
    permission: session.AdminUser.permission,
  };

  req.admin = admin;
  next();
}
