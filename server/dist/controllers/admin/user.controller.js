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
exports.getUserAdminHandler = getUserAdminHandler;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function getUserAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = req.admin;
        if (!admin.permission.includes("ADMIN") &&
            !admin.permission.includes("USER")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        try {
            const user = yield prisma_1.default.user.findMany({
                select: {
                    name: true,
                    mobileNo: true,
                    email: true,
                    isEmailVerified: true,
                },
            });
            res.json({
                msg: "Users fetched",
                data: user,
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
