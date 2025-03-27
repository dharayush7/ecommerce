"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("@/controllers/category.controller");
const router = (0, express_1.Router)();
router.get("/get", category_controller_1.getCategoryHandler);
router.get("/get/:id", category_controller_1.getProductByCategory);
exports.default = router;
