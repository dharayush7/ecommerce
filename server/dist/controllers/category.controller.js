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
exports.getCategoryHandler = getCategoryHandler;
exports.getProductByCategory = getProductByCategory;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function getCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield prisma_1.default.category.findMany({
                where: {
                    isTag: false,
                },
                select: {
                    name: true,
                    id: true,
                },
            });
            res.json({
                msg: "Categories fetched",
                data: categories,
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
function getProductByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.id;
        try {
            const listOfProduct = yield prisma_1.default.category.findUnique({
                where: {
                    id: categoryId,
                },
                include: {
                    productOnCategories: {
                        select: {
                            product: true,
                        },
                    },
                },
            });
            if (!listOfProduct) {
                res.json(400).json({
                    msg: "Category not found",
                });
                return;
            }
            res.json({
                msg: "Products fetched",
                data: listOfProduct.productOnCategories.map((e) => e.product),
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
