"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("@/middleware/user.middleware"));
const profile_controller_1 = require("@/controllers/profile.controller");
const router = (0, express_1.Router)();
router.use(user_middleware_1.default);
router.get("/get", profile_controller_1.getProfile);
router.post("/update", profile_controller_1.updateProfile);
exports.default = router;
