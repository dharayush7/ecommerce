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
exports.getProducthandler = getProducthandler;
exports.getProductById = getProductById;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function getProducthandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield prisma_1.default.product.findMany({
                include: {
                    productOnCategories: {
                        include: {
                            category: true,
                        },
                    },
                    images: {
                        select: {
                            url: true,
                        },
                    },
                },
            });
            const resBody = [];
            products.map((prd) => {
                const categories = [];
                const tags = [];
                prd.productOnCategories.map((e) => {
                    if (e.category.isTag)
                        categories.push({ name: e.category.name, id: e.category.id });
                    else
                        tags.push({ name: e.category.name, id: e.category.id });
                });
                resBody.push({
                    id: prd.id,
                    name: prd.name,
                    sellPrice: prd.sellPrice,
                    maxPrice: prd.maxPrice,
                    tags: categories,
                    categories: tags,
                    description: prd.description,
                    images: prd.images.map((e) => e.url),
                });
            });
            res.json({
                msg: "Product fetched",
                data: resBody,
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
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.id;
        try {
            const product = yield prisma_1.default.product.findUnique({
                where: {
                    id: productId,
                },
                include: {
                    productOnCategories: {
                        select: {
                            category: {
                                select: {
                                    id: true,
                                    isTag: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    images: {
                        select: {
                            url: true,
                        },
                    },
                },
            });
            if (!product) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            const suggestedProduct = yield prisma_1.default.productOnCategories.findMany({
                where: {
                    categoryId: {
                        in: [...product.productOnCategories.map((e) => e.category.id)],
                    },
                },
                include: {
                    product: {
                        include: {
                            productOnCategories: {
                                include: {
                                    category: true,
                                },
                            },
                            images: {
                                select: {
                                    url: true,
                                },
                            },
                        },
                    },
                },
                distinct: "productId",
            });
            const resBody = [];
            suggestedProduct.map((prd) => {
                const categories = [];
                const tags = [];
                prd.product.productOnCategories.map((e) => {
                    if (e.category.isTag)
                        categories.push({ name: e.category.name, id: e.category.id });
                    else
                        tags.push({ name: e.category.name, id: e.category.id });
                });
                resBody.push({
                    id: prd.product.id,
                    name: prd.product.name,
                    sellPrice: prd.product.sellPrice,
                    maxPrice: prd.product.maxPrice,
                    description: prd.product.description,
                    tags: categories,
                    categories: tags,
                    images: prd.product.images.map((e) => e.url),
                });
            });
            res.json({
                msg: "Product fetched",
                data: {
                    product: product,
                    suggestedProduct: resBody,
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
