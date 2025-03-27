"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_middleware_1 = __importDefault(require("@/middleware/user.middleware"));
const express_1 = require("express");
const cart_controller_1 = require("@/controllers/cart.controller");
const router = (0, express_1.Router)();
router.use(user_middleware_1.default);
router.post("/add", cart_controller_1.addProductToCart);
router.get("/get", cart_controller_1.getCartHandler);
router.get("/increase", cart_controller_1.incrCount);
router.get("/decrease", cart_controller_1.decrCount);
router.get("/switch", cart_controller_1.switchToLater);
router.post("/remove", cart_controller_1.removeProductHandler);
exports.default = router;
