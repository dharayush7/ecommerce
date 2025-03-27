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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductHandler = addProductHandler;
exports.getProductHandler = getProductHandler;
exports.getProductByIdHandler = getProductByIdHandler;
exports.changeProductStatus = changeProductStatus;
exports.updateProductHandler = updateProductHandler;
exports.updateMediaOfProduct = updateMediaOfProduct;
const validation_1 = require("@/lib/validation");
const prisma_1 = __importDefault(require("@/lib/prisma"));
function addProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        const values = req.body;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        const result = validation_1.addProductSchema.safeParse(Object.assign(Object.assign({}, values), { maxPrice: Number(values.maxPrice), sellPrice: Number(values.sellPrice), quantity: Number(values.quantity) }));
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0],
            });
            return;
        }
        const _a = result.data, { images, category } = _a, data = __rest(_a, ["images", "category"]);
        try {
            const result = yield prisma_1.default.product.create({
                data: Object.assign(Object.assign({}, data), { images: {
                        connect: images === null || images === void 0 ? void 0 : images.map((e) => ({ id: e })),
                    }, productOnCategories: {
                        create: [...category.map((e) => ({ categoryId: e }))],
                    } }),
            });
            res.json({
                msg: "Product added",
                data: result,
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
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        try {
            const data = yield prisma_1.default.product.findMany();
            res.json({
                msg: "Product fetched",
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
function getProductByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        const productId = req.params.id;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        try {
            const data = yield prisma_1.default.product.findUnique({
                where: {
                    id: productId,
                },
                include: {
                    images: true,
                    productOnCategories: true,
                },
            });
            if (!data) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            res.json({
                msg: "Product fetched",
                data: Object.assign(Object.assign({}, data), { category: data.productOnCategories.map((e) => e.categoryId) }),
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
function changeProductStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const status = req.query.status;
        const user = req.admin;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        if (!status) {
            res.json({
                msg: "status is undefined",
            });
        }
        try {
            const boolStatus = status === "true";
            const product = yield prisma_1.default.product.findUnique({
                where: {
                    id,
                },
            });
            if (!product) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            yield prisma_1.default.product.update({
                where: {
                    id,
                },
                data: {
                    isLive: boolStatus,
                },
            });
            res.json({
                msg: "Status updated",
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
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        const values = req.body;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        const result = validation_1.updateProductSchema.safeParse(values);
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0],
            });
            return;
        }
        const _a = result.data, { id, category } = _a, data = __rest(_a, ["id", "category"]);
        try {
            const product = yield prisma_1.default.product.findUnique({
                where: {
                    id,
                },
                include: {
                    productOnCategories: true,
                },
            });
            if (!product) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            yield prisma_1.default.product.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, data), { productOnCategories: {
                        delete: [
                            ...product.productOnCategories.map((e) => ({
                                productId_categoryId: {
                                    categoryId: e.categoryId,
                                    productId: e.productId,
                                },
                            })),
                        ],
                        create: [...category.map((e) => ({ categoryId: e }))],
                    } }),
            });
            res.json({
                msg: "Product updated",
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
function updateMediaOfProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = req.body;
        const user = req.admin;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        if (!values.image || !values.productId) {
            res.status(400).json({
                msg: "Update failed",
            });
            return;
        }
        try {
            const product = yield prisma_1.default.product.findUnique({
                where: { id: values.productId },
                include: { images: true },
            });
            if (!product) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            yield prisma_1.default.product.update({
                where: { id: product.id },
                data: {
                    images: {
                        disconnect: product.images.map((e) => ({ id: e.id })),
                        connect: values.image.map((e) => ({ id: e })),
                    },
                },
            });
            res.json({
                msg: "Product image updated",
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
