import { Request, Response } from "express";
import { z } from "zod";
import {
  adminVerificationSchema,
  loginSchema,
  verifyOtpSchema,
} from "@/lib/validation";
import prisma from "@/lib/prisma";
import { comparePassword, hashPasword } from "@/lib/password";
import { Nullable } from "@/types";
import { checkExpiry } from "@/lib/function";
import { sendMail } from "@/service/mail";

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
    await sendMail(result.data.email, otpCode);
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
        type: "EMAIL",
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

export async function resendOTPHandler(req: Request, res: Response) {
  const userId = req.body.userId as Nullable;
  if (!userId) {
    res.status(400).json({
      msg: "user not found",
    });
    return;
  }
  try {
    const otps = await prisma.oTP.findMany({
      where: {
        adminUserId: {
          equals: userId,
        },
      },
      include: {
        adminUser: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (otps.length == 0) {
      res.status(400).json({
        msg: "user or otp not found",
      });
      return;
    }

    console.log({ otp: otps[0].code });
    await sendMail(otps[0].adminUser.email, otps[0].code);

    res.json({
      msg: "Otp resend successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function forgetOtpHandler(req: Request, res: Response) {
  const email = req.body.email as Nullable;
  const result = z.string().email("Invalid email").safeParse(email);
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }
  try {
    const admin = await prisma.adminUser.findUnique({
      where: {
        email: result.data,
      },
    });

    if (!admin) {
      res.status(400).json({
        msg: "User not found",
      });
      return;
    }

    const [restSession, _otp] = await Promise.all([
      prisma.adminRestPasswordSession.create({
        data: {
          adminUserId: admin.id,
        },
      }),
      prisma.oTP.deleteMany({
        where: {
          adminUserId: admin.id,
        },
      }),
    ]);

    const mobileOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    // TODO: OTP Sent

    console.log({ mobileOtp, emailOtp });

    await Promise.all([
      prisma.oTP.create({
        data: {
          adminUserId: admin.id,
          code: mobileOtp,
          type: "MOBILE",
          adminRestPasswordSessionId: restSession.id,
        },
      }),
      prisma.oTP.create({
        data: {
          adminUserId: admin.id,
          code: emailOtp,
          type: "EMAIL",
          adminRestPasswordSessionId: restSession.id,
        },
      }),
    ]);

    res.json({
      restSessionId: restSession.id,
      msg: "OTP send successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function verifyOtpHandler(req: Request, res: Response) {
  const emailOtp = req.body.emailOtp as Nullable;
  const mobileOtp = req.body.mobileOtp as Nullable;
  const sessionId = req.headers.authorization;
  let result;
  try {
    result = verifyOtpSchema.safeParse({
      emailOtp: Number(emailOtp),
      mobileOtp: Number(mobileOtp),
      sessionId,
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
    const session = await prisma.adminRestPasswordSession.findUnique({
      where: {
        id: data.sessionId.split(" ")[1],
      },
      include: {
        otp: true,
      },
    });

    if (!session) {
      res.status(400).json({
        msg: "session not found",
      });
      return;
    }

    if (!checkExpiry(session.expireAt)) {
      res.status(401).json({
        msg: "session expired",
      });
      return;
    }
    const mobileOtp = session.otp.filter((e) => e.type === "MOBILE")[0];
    const emailOtp = session.otp.filter((e) => e.type === "EMAIL")[0];

    if (mobileOtp.code != data.mobileOtp || emailOtp.code != data.emailOtp) {
      res.status(401).json({
        msg: "Wrong OTP",
      });
    }

    await Promise.all([
      prisma.adminRestPasswordSession.update({
        where: {
          id: session.id,
        },
        data: {
          isVarfied: true,
        },
      }),
      prisma.oTP.deleteMany({
        where: {
          adminRestPasswordSessionId: session.id,
        },
      }),
    ]);

    res.json({
      msg: "OTP verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function chnagePasswordHandler(req: Request, res: Response) {
  const password = req.body.password as Nullable;
  const sessionId = req.headers.authorization;

  if (!sessionId) {
    res.status(401).json({
      msg: "session not found",
    });
    return;
  }
  const result = z
    .string()
    .min(6, "Password should be atleast 6 charecter long")
    .safeParse(password);

  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }

  try {
    const session = await prisma.adminRestPasswordSession.findUnique({
      where: {
        id: sessionId.split(" ")[1],
        isVarfied: true,
        isChanged: false,
      },
    });

    if (!session) {
      res.status(401).json({
        msg: "Session not found",
      });
      return;
    }

    if (!checkExpiry(session.expireAt)) {
      res.status(401).json({
        msg: "Session expired",
      });
      return;
    }
    const hashed = await hashPasword(result.data);

    await Promise.all([
      prisma.adminRestPasswordSession.update({
        where: {
          id: session.id,
        },
        data: {
          isChanged: true,
        },
      }),
      prisma.adminUser.update({
        where: {
          id: session.adminUserId,
        },
        data: {
          password: hashed,
        },
      }),
    ]);

    res.json({
      msg: "password changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
