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
const prisma_1 = __importDefault(require("@/lib/prisma"));
const validation_1 = require("@/lib/validation");
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mobileNo = req.body.mobileNo;
        const uid = req.body.uid;
        let result;
        try {
            result = validation_1.userLoginSchema.safeParse({ mobileNo: Number(mobileNo), uid });
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
                msg: "Phone number imvalid",
            });
            return;
        }
        const data = result.data;
        result = null;
        try {
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    mobileNo: String(data.mobileNo),
                },
            });
            if (user) {
                res.json({
                    msg: "Authenticate",
                    data: user,
                });
                return;
            }
            const newUser = yield prisma_1.default.user.create({
                data: {
                    mobileNo: String(data.mobileNo),
                    uid: data.uid,
                },
            });
            res.json({
                msg: "User Saved",
                data: newUser,
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
