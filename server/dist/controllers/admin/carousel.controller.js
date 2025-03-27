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
const prisma_1 = __importDefault(require("@/lib/prisma"));
const validation_1 = require("@/lib/validation");
function addCarousel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
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
