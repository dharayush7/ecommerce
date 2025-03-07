import { checkExpiry } from "@/lib/function";
import prisma from "@/lib/prisma";
import { userLoginSchema, userVerificationSchema } from "@/lib/validation";
import { Nullable } from "@/types";
import { Request, Response } from "express";

export async function loginHandler(req: Request, res: Response) {
  const mobileNo = req.body.mobileNo as Nullable;
  let result;
  try {
    result = userLoginSchema.safeParse({ mobileNo: Number(mobileNo) });
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

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    // TODO: OTP Sending
    console.log({ otpCode });

    if (user) {
      await prisma.userOTP.create({
        data: {
          code: otpCode,
          userId: user.id,
        },
      });

      res.json({
        msg: "Otp sent successfully",
        userId: user.id,
      });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        mobileNo: String(data.mobileNo),
      },
    });
    await prisma.userOTP.create({
      data: {
        code: otpCode,
        userId: newUser.id,
      },
    });

    res.json({
      msg: "Otp sent successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function userVerificationHandler(req: Request, res: Response) {
  const otpCode = req.body.otpCode as Nullable;
  const userId = req.body.userId as Nullable;
  let result;
  try {
    result = userVerificationSchema.safeParse({
      otpCode: Number(otpCode),
      userId,
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
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
      include: {
        userOTP: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!user || user.userOTP.length == 0) {
      res.status(400).json({
        msg: "user or otp not found",
      });
      return;
    }
    const otps = user.userOTP;

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

    const [_otp, session] = await Promise.all([
      prisma.userOTP.deleteMany({
        where: {
          userId: {
            equals: user.id,
          },
        },
      }),
      prisma.session.create({
        data: {
          userId: user.id,
        },
      }),
    ]);

    res.json({
      sessionId: session.id,
      msg: "Logged in successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
