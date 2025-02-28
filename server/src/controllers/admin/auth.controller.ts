import { Request, Response } from "express";
import { adminVerificationSchema, loginSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { Nullable } from "@/types";
import { checkExpiry } from "@/lib/function";

export async function loginHandler(req: Request, res: Response) {
  try {
    const email = req.body.email as Nullable;
    const password = req.body.password as Nullable;

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      res.status(400).json({
        msg: result.error.issues[0].message,
      });
      return;
    }

    const data = result.data;
    const user = await prisma.adminUser.findFirst({
      where: {
        email: {
          equals: data.email,
        },
      },
    });

    if (!user) {
      res.status(400).json({
        msg: "Wrong email or password",
      });
      return;
    }

    if (!(await comparePassword(data.password, user.password))) {
      res.status(400).json({
        msg: "Wrong email or password",
      });
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    console.log({ otpCode });
    await prisma.oTP.deleteMany({
      where: {
        adminUserId: {
          equals: user.id,
        },
      },
    });
    const otp = await prisma.oTP.create({
      data: {
        code: otpCode,
        adminUserId: user.id,
      },
    });

    res.json({
      msg: "Otp sent successfully",
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function verificationHandler(req: Request, res: Response) {
  const otpCode = req.body.otp as Nullable;
  const userId = req.body.userId as Nullable;
  let result;
  try {
    result = adminVerificationSchema.safeParse({
      userId,
      otpCode: Number(otpCode),
    });
    if (!result.success) {
      res.status(400).json({
        msg: result.error.issues[0].message,
      });
      return;
    }
  } catch (error) {
    result = null;
    res.status(400).json({
      msg: "Otp should be number",
    });
    return;
  }

  const data = result.data;
  result = null;
  try {
    const user = await prisma.adminUser.findUnique({
      where: {
        id: data.userId,
      },
      include: {
        otps: true,
        sessions: true,
      },
    });

    if (!user || user.otps.length == 0) {
      res.status(400).json({
        msg: "user or otp not found",
      });
      return;
    }
    const otps = user.otps.sort((a, b) => {
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;

      return 0;
    });
    console.log(otps);
    console.log(data);
    if (otps[0].code != data.otpCode) {
      res.status(400).json({
        msg: "Wrong Otp",
      });
      return;
    }

    if (!checkExpiry(otps[0].expireAt)) {
      res.status(400).json({
        msg: "Wrong Otp",
      });
      return;
    }

    await Promise.all([
      prisma.adminSession.deleteMany({
        where: {
          adminUserId: {
            equals: user.id,
          },
        },
      }),
      prisma.oTP.deleteMany({
        where: {
          adminUserId: {
            equals: user.id,
          },
        },
      }),
    ]);

    const sessions = await prisma.adminSession.create({
      data: {
        adminUserId: user.id,
      },
    });

    res.cookie("auth", sessions.id, {
      expires: sessions.expireAt,
    });
    res.cookie("permission", user.permission.join(","), {
      expires: sessions.expireAt,
    });

    res.json({
      sessionId: sessions.id,
      permission: user.permission,
      msg: "Logged in successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
