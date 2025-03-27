"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("@/middleware/admin.middleware"));
const category_controller_1 = require("@/controllers/admin/category.controller");
const router = (0, express_1.Router)();
router.use(admin_middleware_1.default);
router.get("/get", category_controller_1.getCatergory);
router.post("/create", category_controller_1.createCategory);
router.post("/update", category_controller_1.updateCategory);
exports.default = router;
