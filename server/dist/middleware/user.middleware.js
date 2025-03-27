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
exports.default = userMiddleware;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function userMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const uid = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!uid) {
            res.status(401).json({
                msg: "Session not found",
            });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
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
    });
}
