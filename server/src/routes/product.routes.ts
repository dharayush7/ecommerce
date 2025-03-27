import { Router } from "express";
import {
  getProducthandler,
  getProductById,
} from "@/controllers/product.controller";
const router = Router();

router.get("/get", getProducthandler);
router.get("/get/:id", getProductById);

export default router;
