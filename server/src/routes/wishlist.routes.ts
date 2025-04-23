import userMiddleware from "@/middleware/user.middleware";
import { Router } from "express";
import {
  getWishlistHandler,
  wishlistCURD,
} from "@/controllers/wishlist.controller";

const router = Router();

router.use(userMiddleware);

router.post("/curd", wishlistCURD);
router.get("/get", getWishlistHandler);

export default router;
