import userMiddleware from "@/middleware/user.middleware";
import { Router } from "express";
import {
  addProductToCart,
  decrCount,
  getCartHandler,
  incrCount,
  removeProductHandler,
} from "@/controllers/cart.controller";

const router = Router();

router.use(userMiddleware);
router.post("/add", addProductToCart);
router.get("/get", getCartHandler);
router.get("/increase", incrCount);
router.get("/decrease", decrCount);
router.post("/remove", removeProductHandler);

export default router;
