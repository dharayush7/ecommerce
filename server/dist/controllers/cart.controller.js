"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCart = addProductToCart;
exports.getCartHandler = getCartHandler;
exports.incrCount = incrCount;
exports.decrCount = decrCount;
exports.removeProductHandler = removeProductHandler;
exports.switchToLater = switchToLater;
const prisma_1 = __importDefault(require("@/lib/prisma"));
function addProductToCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const productId = req.body.productId;
        const qyt = req.body.qyt;
        if (!productId || !qyt) {
            res.status(400).json({
                msg: "Product Id or qyt is empty",
            });
            return;
        }
        try {
            const product = prisma_1.default.product.findUnique({
                where: {
                    id: productId,
                },
            });
            if (!product) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            yield prisma_1.default.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    productOnCarts: {
                        create: [{ productId, quantity: qyt }],
                    },
                },
            });
            res.json({
                msg: "Cart updated",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function getCartHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        try {
            const data = yield prisma_1.default.productOnCarts.findMany({
                where: {
                    userId: user.id,
                },
                select: {
                    productId: true,
                    quantity: true,
                    isSaveForLater: true,
                    product: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            res.json({
                msg: "Cart fetched",
                data,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function incrCount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const productId = req.query.id;
        if (!productId) {
            res.status(400).json({
                msg: "Product Id is empty",
            });
            return;
        }
        try {
            const cart = yield prisma_1.default.productOnCarts.findFirst({
                where: {
                    userId: {
                        equals: user.id,
                    },
                    productId: {
                        equals: productId,
                    },
                },
            });
            if (!cart) {
                res.status(400).json({
                    msg: "Cart not found",
                });
                return;
            }
            yield prisma_1.default.productOnCarts.update({
                where: {
                    userId_productId: {
                        userId: user.id,
                        productId: productId,
                    },
                },
                data: {
                    quantity: cart.quantity + 1,
                },
            });
            res.json({
                msg: "Cart updated",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function decrCount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const productId = req.query.id;
        if (!productId) {
            res.status(400).json({
                msg: "Product Id is empty",
            });
            return;
        }
        try {
            const cart = yield prisma_1.default.productOnCarts.findFirst({
                where: {
                    userId: {
                        equals: user.id,
                    },
                    productId: {
                        equals: productId,
                    },
                },
            });
            if (!cart) {
                res.status(400).json({
                    msg: "Cart not found",
                });
                return;
            }
            if (cart.quantity == 1) {
                res.status(400).json({
                    msg: "Item is minimum limit",
                });
                return;
            }
            yield prisma_1.default.productOnCarts.update({
                where: {
                    userId_productId: {
                        userId: user.id,
                        productId: productId,
                    },
                },
                data: {
                    quantity: cart.quantity - 1,
                },
            });
            res.json({
                msg: "Cart updated",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function removeProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const productId = req.body.productId;
        if (!productId) {
            res.status(400).json({
                msg: "Product id is empty",
            });
            return;
        }
        try {
            const cart = yield prisma_1.default.productOnCarts.findUnique({
                where: {
                    userId_productId: {
                        userId: user.id,
                        productId,
                    },
                },
            });
            if (!cart) {
                res.status(400).json({
                    msg: "Product not found",
                });
                return;
            }
            yield prisma_1.default.productOnCarts.delete({
                where: {
                    userId_productId: {
                        productId: cart.productId,
                        userId: cart.userId,
                    },
                },
            });
            res.json({
                msg: "Item removed from the cart",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
function switchToLater(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const productId = req.query.id;
        if (!productId) {
            res.status(400).json({
                msg: "Product id is empty",
            });
            return;
        }
        try {
            const cart = yield prisma_1.default.productOnCarts.findFirst({
                where: {
                    userId: {
                        equals: user.id,
                    },
                    productId: {
                        equals: productId,
                    },
                },
            });
            if (!cart) {
                res.status(400).json({
                    msg: "Cart not found",
                });
                return;
            }
            yield prisma_1.default.productOnCarts.update({
                where: {
                    userId_productId: {
                        productId: productId,
                        userId: user.id,
                    },
                },
                data: {
                    isSaveForLater: !cart.isSaveForLater,
                },
            });
            res.json({
                msg: "Cart updated",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal server error",
            });
        }
    });
}
