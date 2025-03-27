"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("@/controllers/admin/user.controller");
const admin_middleware_1 = __importDefault(require("@/middleware/admin.middleware"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use(admin_middleware_1.default);
router.get("/get", user_controller_1.getUserAdminHandler);
exports.default = router;
