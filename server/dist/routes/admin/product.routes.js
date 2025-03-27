"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("@/controllers/admin/product.controller");
const admin_middleware_1 = __importDefault(require("@/middleware/admin.middleware"));
const router = (0, express_1.Router)();
router.use(admin_middleware_1.default);
router.post("/add", product_controller_1.addProductHandler);
router.get("/get", product_controller_1.getProductHandler);
router.get("/get/:id", product_controller_1.getProductByIdHandler);
router.get("/change-status/:id", product_controller_1.changeProductStatus);
router.post("/update", product_controller_1.updateProductHandler);
router.post("/update-media", product_controller_1.updateMediaOfProduct);
exports.default = router;
