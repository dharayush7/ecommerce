import userMiddleware from "@/middleware/user.middleware";
import { Router } from "express";
import {
  addProductToCart,
  decrCount,
  getCartHandler,
  incrCount,
  removeProductHandler,
  switchToLater,
} from "@/controllers/cart.controller";

const router = Router();

router.use(userMiddleware);
router.post("/add", addProductToCart);
router.get("/get", getCartHandler);
router.get("/increase", incrCount);
router.get("/decrease", decrCount);
router.get("/switch", switchToLater);
router.post("/remove", removeProductHandler);

export default router;
