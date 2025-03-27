"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carousel_controller_1 = require("@/controllers/admin/carousel.controller");
const router = (0, express_1.Router)();
router.post("/add", carousel_controller_1.addCarousel);
exports.default = router;
