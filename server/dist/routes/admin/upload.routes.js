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
const express_1 = require("express");
const prisma_1 = __importDefault(require("@/lib/prisma"));
const upload_middleware_1 = __importDefault(require("@/middleware/upload.middleware"));
function imageUplaod(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.body.url;
        if (!url) {
            res.status(400).json({
                msg: "url invalid",
            });
            return;
        }
        try {
            const media = yield prisma_1.default.productImage.create({
                data: { url },
            });
            res.json({
                msg: "Media uploaded",
                data: {
                    mediaId: media.id,
                },
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
function getUnusedMedia(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const unUsedMedia = yield prisma_1.default.productImage.findMany({
                where: {
                    productId: null,
                    createdAt: {
                        lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
                    },
                },
                select: {
                    url: true,
                },
            });
            res.json({
                msg: "Unused media fetched",
                date: unUsedMedia.map((e) => e.url),
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
function deleteUnusedMedia(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.productImage.deleteMany({
                where: {
                    productId: null,
                    createdAt: {
                        lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
                    },
                },
            });
            res.json({
                msg: "Deleted",
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
const router = (0, express_1.Router)();
router.use(upload_middleware_1.default);
router.post("/", imageUplaod);
router.get("/unused/get", getUnusedMedia);
router.get("/unused/delete", deleteUnusedMedia);
exports.default = router;
