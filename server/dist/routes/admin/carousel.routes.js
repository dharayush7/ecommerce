"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carousel_controller_1 = require("@/controllers/admin/carousel.controller");
const admin_middleware_1 = __importDefault(require("@/middleware/admin.middleware"));
const router = (0, express_1.Router)();
router.use(admin_middleware_1.default);
router.get("/get", carousel_controller_1.getCarousel);
router.post("/add", carousel_controller_1.addCarousel);
router.post("/delete", carousel_controller_1.deleteCarousel);
exports.default = router;
