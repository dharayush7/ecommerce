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
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const response = {
            mobileNo: user.mobileNo,
            email: user.email,
            name: user.name,
        };
        res.json({
            msg: "User fetched",
            data: response,
        });
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const email = req.body.email;
        const name = req.body.name;
        if (!name) {
            res.status(400).json({
                msg: "name or email is undefined",
            });
            return;
        }
        try {
            yield prisma_1.default.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    name,
                    email,
                },
            });
            res.json({
                msg: "Profile updated",
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
