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
exports.default = adminMiddleware;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function adminMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const sessionId = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!sessionId) {
            res.status(401).json({
                msg: "Session not found",
            });
            return;
        }
        const session = yield prisma_1.default.adminSession.findUnique({
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
        const admin = {
            email: session.AdminUser.email,
            id: session.AdminUser.id,
            isOwner: session.AdminUser.isOwner,
            mobileNo: session.AdminUser.mobileNo,
            name: session.AdminUser.name,
            permission: session.AdminUser.permission,
        };
        req.admin = admin;
        next();
    });
}
