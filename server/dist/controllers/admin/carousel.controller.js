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
exports.addCarousel = addCarousel;
exports.getCarousel = getCarousel;
exports.deleteCarousel = deleteCarousel;
const prisma_1 = __importDefault(require("@/lib/prisma"));
const validation_1 = require("@/lib/validation");
function addCarousel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const user = req.admin;
        if (!user.permission.includes("ADMIN") && !user.permission.includes("SITE")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        const result = validation_1.addCarouselSchema.safeParse(data);
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0].message,
            });
            return;
        }
        try {
            const validateData = result.data;
            yield prisma_1.default.carousel.create({
                data: Object.assign(Object.assign({}, (validateData.isBlack && { isBlack: validateData.isBlack })), { link: validateData.link, images: {
                        connect: { id: validateData.imageId },
                    }, preference: Number(validateData.preference) }),
            });
            res.json({
                msg: "carousel added",
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
function getCarousel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        if (!user.permission.includes("ADMIN") && !user.permission.includes("SITE")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        try {
            const data = yield prisma_1.default.carousel.findMany({
                include: {
                    images: {
                        select: {
                            url: true,
                        },
                    },
                },
            });
            res.json({
                msg: "Carousel fetched",
                data,
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
function deleteCarousel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        const carouselId = req.body.carouselId;
        if (!user.permission.includes("ADMIN") && !user.permission.includes("SITE")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        if (!carouselId) {
            res.status(400).json({
                msg: "Carousel Id not found",
            });
            return;
        }
        try {
            const carousel = yield prisma_1.default.carousel.findUnique({
                where: {
                    id: carouselId,
                },
            });
            if (!carousel) {
                res.status(400).json({
                    msg: "Carousel not found",
                });
                return;
            }
            yield prisma_1.default.carousel.delete({
                where: Object.assign({}, carousel),
            });
            res.json({
                msg: "Deleted successfully",
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
