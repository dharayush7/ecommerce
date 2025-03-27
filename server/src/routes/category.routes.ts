import { Router } from "express";
import {
  getCategoryHandler,
  getProductByCategory,
} from "@/controllers/category.controller";

const router = Router();

router.get("/get", getCategoryHandler);
router.get("/get/:id", getProductByCategory);

export default router;
