import { Router } from "express";
import { getProducthandler } from "@/controllers/product.controller";
const router = Router();

router.get("/get", getProducthandler);

export default router;
