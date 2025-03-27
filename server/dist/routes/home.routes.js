"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("@/controllers/home.controller");
const router = (0, express_1.Router)();
router.get("/get", home_controller_1.getData);
exports.default = router;
