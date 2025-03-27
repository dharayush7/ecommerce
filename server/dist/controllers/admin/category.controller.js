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
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.getCatergory = getCatergory;
const prisma_1 = __importDefault(require("@/lib/prisma"));
const validation_1 = require("@/lib/validation");
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        const name = req.body.name;
        const desc = req.body.desc;
        const isTag = req.body.isTag;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        const result = validation_1.createCategorySchema.safeParse({ name, desc, isTag });
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0],
            });
            return;
        }
        const data = result.data;
        try {
            yield prisma_1.default.category.create({
                data: {
                    name: data.name,
                    description: data.desc,
                    isTag: data.isTag,
                },
            });
            res.json({
                msg: "category created sucessfully",
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
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.admin;
        const id = req.body.id;
        const name = req.body.name;
        const desc = req.body.desc;
        const isTag = req.body.isTag;
        if (!user.permission.includes("ADMIN") &&
            !user.permission.includes("PRODUCT")) {
            res.status(401).json({
                msg: "Access Denied",
            });
            return;
        }
        const result = validation_1.updateCategorySchema.safeParse({ name, desc, id, isTag });
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0],
            });
            return;
        }
        const data = result.data;
        try {
            const category = yield prisma_1.default.category.findUnique({
                where: {
                    id: data.id,
                },
            });
            if (!category) {
                res.status(400).json({
                    msg: "Category not found",
                });
                return;
            }
            yield prisma_1.default.category.update({
                where: {
                    id: category.id,
                },
                data: {
                    name: data.name,
                    description: data.desc,
                    isTag: data.isTag,
                },
            });
            res.json({
                msg: "category updated sucessfully",
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
function getCatergory(req, res) {
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
            const categories = yield prisma_1.default.category.findMany({
                include: {
                    productOnCategories: true,
                },
            });
            res.json({
                msg: "Categories fetched",
                data: [
                    ...categories.map((e) => (Object.assign(Object.assign({}, e), { count: e.productOnCategories.length }))),
                ],
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
