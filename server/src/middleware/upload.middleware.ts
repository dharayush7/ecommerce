import { NextFunction, Request, Response } from "express";

const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN!;

export default async function uploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers.authorization;
  if (!headers) {
    res.json({
      msg: "Unauthorized",
    });
    return;
  }
  const token = headers.split(" ")[1];
  if (token !== UPLOAD_TOKEN) {
    res.json({
      msg: "Unauthorized",
    });
    return;
  }
  next();
}
