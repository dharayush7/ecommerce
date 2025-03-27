"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maneger_controller_1 = require("@/controllers/admin/maneger.controller");
const admin_middleware_1 = __importDefault(require("@/middleware/admin.middleware"));
const router = (0, express_1.Router)();
router.use(admin_middleware_1.default);
router.get("/get", maneger_controller_1.getManegerHandler);
router.post("/add", maneger_controller_1.addManegerHandler);
router.post("/update", maneger_controller_1.updateManegerHandler);
router.post("/permission/update", maneger_controller_1.updatePermissionOfManegerHandler);
router.post("/delete", maneger_controller_1.deleteManegerHandler);
exports.default = router;
