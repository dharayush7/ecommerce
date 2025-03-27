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
exports.getData = getData;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function getData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [products, carousel] = yield Promise.all([
                yield prisma_1.default.product.findMany({
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
                }),
                yield prisma_1.default.carousel.findMany({
                    orderBy: {
                        preference: "asc",
                    },
                }),
            ]);
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
                    description: prd.description,
                    tags: categories,
                    categories: tags,
                    images: prd.images.map((e) => e.url),
                });
            });
            res.json({
                msg: "Product fetched",
                data: {
                    products: resBody,
                    carousel,
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
