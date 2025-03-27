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
exports.getManegerHandler = getManegerHandler;
exports.addManegerHandler = addManegerHandler;
exports.updateManegerHandler = updateManegerHandler;
exports.updatePermissionOfManegerHandler = updatePermissionOfManegerHandler;
exports.deleteManegerHandler = deleteManegerHandler;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("@/lib/prisma"));
const password_1 = require("@/lib/password");
const validation_1 = require("@/lib/validation");
function getManegerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { permission } = req.admin;
        if (!permission.includes("ADMIN")) {
            res.status(401).json({
                msg: "Access denied",
            });
            return;
        }
        try {
            const user = yield prisma_1.default.adminUser.findMany({
                select: {
                    email: true,
                    isOwner: true,
                    permission: true,
                    name: true,
                },
            });
            res.json({
                msg: "Maneger fetch",
                data: user,
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
function addManegerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, mobileNo, password, admin, product, order, payment, customer, site, } = req.body;
        const { permission: adminPersion } = req.admin;
        if (!adminPersion.includes("ADMIN")) {
            res.status(401).json({
                msg: "Access denied",
            });
            return;
        }
        const result = validation_1.addManegerSchema.safeParse({
            name,
            email,
            mobileNo: Number(mobileNo),
            password,
            admin,
            product,
            order,
            payment,
            customer,
            site,
        });
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0].message,
            });
            return;
        }
        const data = result.data;
        const permission = [];
        if (data.admin)
            permission.push("ADMIN");
        if (data.product)
            permission.push("PRODUCT");
        if (data.order)
            permission.push("ORDER");
        if (data.payment)
            permission.push("PAYMENT");
        if (data.customer)
            permission.push("CUSTOMER");
        if (data.site)
            permission.push("SITE");
        const hashed = yield (0, password_1.hashPasword)(data.password);
        try {
            const newAdmin = yield prisma_1.default.adminUser.create({
                data: {
                    email: data.email,
                    name: data.name,
                    permission,
                    mobileNo: String(data.mobileNo),
                    password: hashed,
                },
                select: {
                    email: true,
                    isOwner: true,
                    permission: true,
                    name: true,
                },
            });
            res.json({
                msg: "Maneger created successfully",
                data: newAdmin,
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
function updateManegerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { oldEmail, email, name } = req.body;
        const { permission: adminPersion } = req.admin;
        if (!adminPersion.includes("ADMIN")) {
            res.status(401).json({
                msg: "Access denied",
            });
            return;
        }
        const result = validation_1.updateManegerSchema.safeParse({
            email,
            name,
            oldEmail,
        });
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0].message,
            });
            return;
        }
        const data = result.data;
        try {
            const updatedAdmin = yield prisma_1.default.adminUser.update({
                where: {
                    email: data.oldEmail,
                },
                data: {
                    email: data.email,
                    name: data.name,
                },
                select: {
                    email: true,
                    isOwner: true,
                    permission: true,
                    name: true,
                },
            });
            res.json({
                msg: "Maneger updated successfully",
                data: updatedAdmin,
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
function updatePermissionOfManegerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, admin, product, order, payment, customer, site, } = req.body;
        const { permission: adminPersion } = req.admin;
        if (!adminPersion.includes("ADMIN")) {
            res.status(401).json({
                msg: "Access denied",
            });
            return;
        }
        const result = validation_1.updatePermisionOfManegerSchema.safeParse({
            email,
            admin,
            product,
            order,
            payment,
            customer,
            site,
        });
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0].message,
            });
            return;
        }
        const data = result.data;
        const permission = [];
        if (data.admin)
            permission.push("ADMIN");
        if (data.product)
            permission.push("PRODUCT");
        if (data.order)
            permission.push("ORDER");
        if (data.payment)
            permission.push("PAYMENT");
        if (data.customer)
            permission.push("CUSTOMER");
        if (data.site)
            permission.push("SITE");
        try {
            const updateManager = yield prisma_1.default.adminUser.update({
                where: {
                    email: data.email,
                },
                data: {
                    permission,
                },
                select: {
                    email: true,
                    isOwner: true,
                    permission: true,
                    name: true,
                },
            });
            res.json({
                msg: "Permision updated successfully",
                data: updateManager,
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
function deleteManegerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const { permission: adminPersion } = req.admin;
        if (!adminPersion.includes("ADMIN")) {
            res.status(401).json({
                msg: "Access denied",
            });
            return;
        }
        const result = zod_1.z.string().email("Invalid email").safeParse(email);
        if (!result.success) {
            res.status(400).json({
                msg: result.error.issues[0].message,
            });
            return;
        }
        const data = result.data;
        try {
            const deletedAdmin = yield prisma_1.default.adminUser.delete({
                where: {
                    email: data,
                },
                select: {
                    email: true,
                    isOwner: true,
                    permission: true,
                    name: true,
                },
            });
            res.json({
                msg: "deleted successfully",
                data: deletedAdmin,
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
