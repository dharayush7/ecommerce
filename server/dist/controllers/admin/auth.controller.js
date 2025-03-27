"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = loginHandler;
exports.verificationHandler = verificationHandler;
exports.resendOTPHandler = resendOTPHandler;
exports.forgetOtpHandler = forgetOtpHandler;
exports.verifyOtpHandler = verifyOtpHandler;
exports.chnagePasswordHandler = chnagePasswordHandler;
const zod_1 = require("zod");
const validation_1 = require("@/lib/validation");
const prisma_1 = __importDefault(require("@/lib/prisma"));
const password_1 = require("@/lib/password");
const function_1 = require("@/lib/function");
const mail_1 = require("@/service/mail");
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const result = validation_1.loginSchema.safeParse({ email, password });
            if (!result.success) {
                res.status(400).json({
                    msg: result.error.issues[0].message,
                });
                return;
            }
            const data = result.data;
            const user = yield prisma_1.default.adminUser.findFirst({
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
            if (!(yield (0, password_1.comparePassword)(data.password, user.password))) {
                res.status(400).json({
                    msg: "Wrong email or password",
                });
                return;
            }
            const otpCode = Math.floor(100000 + Math.random() * 900000);
            yield (0, mail_1.sendMail)(result.data.email, otpCode);
            console.log({ otpCode });
            yield prisma_1.default.oTP.deleteMany({
                where: {
                    adminUserId: {
                        equals: user.id,
                    },
                },
            });
            const otp = yield prisma_1.default.oTP.create({
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function verificationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const otpCode = req.body.otp;
        const userId = req.body.userId;
        let result;
        try {
            result = validation_1.adminVerificationSchema.safeParse({
                userId,
                otpCode: Number(otpCode),
            });
            if (!result.success) {
                res.status(400).json({
                    msg: result.error.issues[0].message,
                });
                return;
            }
        }
        catch (error) {
            result = null;
            res.status(400).json({
                msg: "Otp should be number",
            });
            return;
        }
        const data = result.data;
        result = null;
        try {
            const user = yield prisma_1.default.adminUser.findUnique({
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
                if (a.createdAt > b.createdAt)
                    return 1;
                if (a.createdAt < b.createdAt)
                    return -1;
                return 0;
            });
            if (otps[0].code != data.otpCode) {
                res.status(400).json({
                    msg: "Wrong Otp",
                });
                return;
            }
            if (!(0, function_1.checkExpiry)(otps[0].expireAt)) {
                res.status(400).json({
                    msg: "Wrong Otp",
                });
                return;
            }
            yield Promise.all([
                prisma_1.default.adminSession.deleteMany({
                    where: {
                        adminUserId: {
                            equals: user.id,
                        },
                    },
                }),
                prisma_1.default.oTP.deleteMany({
                    where: {
                        adminUserId: {
                            equals: user.id,
                        },
                    },
                }),
            ]);
            const sessions = yield prisma_1.default.adminSession.create({
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function resendOTPHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({
                msg: "user not found",
            });
            return;
        }
        try {
            const otps = yield prisma_1.default.oTP.findMany({
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
            yield (0, mail_1.sendMail)(otps[0].adminUser.email, otps[0].code);
            res.json({
                msg: "Otp resend successfully",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function forgetOtpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const result = zod_1.z.string().email("Invalid email").safeParse(email);
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0].message,
            });
            return;
        }
        try {
            const admin = yield prisma_1.default.adminUser.findUnique({
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
            const [restSession, _otp] = yield Promise.all([
                prisma_1.default.adminRestPasswordSession.create({
                    data: {
                        adminUserId: admin.id,
                    },
                }),
                prisma_1.default.oTP.deleteMany({
                    where: {
                        adminUserId: admin.id,
                    },
                }),
            ]);
            const mobileOtp = Math.floor(100000 + Math.random() * 900000);
            const emailOtp = Math.floor(100000 + Math.random() * 900000);
            // TODO: OTP Sent
            console.log({ mobileOtp, emailOtp });
            yield Promise.all([
                prisma_1.default.oTP.create({
                    data: {
                        adminUserId: admin.id,
                        code: mobileOtp,
                        type: "MOBILE",
                        adminRestPasswordSessionId: restSession.id,
                    },
                }),
                prisma_1.default.oTP.create({
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function verifyOtpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailOtp = req.body.emailOtp;
        const mobileOtp = req.body.mobileOtp;
        const sessionId = req.headers.authorization;
        let result;
        try {
            result = validation_1.verifyOtpSchema.safeParse({
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
        }
        catch (error) {
            result = null;
            res.status(400).json({
                msg: "Otp should be number",
            });
            return;
        }
        const data = result.data;
        result = null;
        try {
            const session = yield prisma_1.default.adminRestPasswordSession.findUnique({
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
            if (!(0, function_1.checkExpiry)(session.expireAt)) {
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
            yield Promise.all([
                prisma_1.default.adminRestPasswordSession.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        isVarfied: true,
                    },
                }),
                prisma_1.default.oTP.deleteMany({
                    where: {
                        adminRestPasswordSessionId: session.id,
                    },
                }),
            ]);
            res.json({
                msg: "OTP verified",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function chnagePasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = req.body.password;
        const sessionId = req.headers.authorization;
        if (!sessionId) {
            res.status(401).json({
                msg: "session not found",
            });
            return;
        }
        const result = zod_1.z
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
            const session = yield prisma_1.default.adminRestPasswordSession.findUnique({
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
            if (!(0, function_1.checkExpiry)(session.expireAt)) {
                res.status(401).json({
                    msg: "Session expired",
                });
                return;
            }
            const hashed = yield (0, password_1.hashPasword)(result.data);
            yield Promise.all([
                prisma_1.default.adminRestPasswordSession.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        isChanged: true,
                    },
                }),
                prisma_1.default.adminUser.update({
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
