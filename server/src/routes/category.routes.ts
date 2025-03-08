import { Router } from "express";
import { getCategoryHandler } from "@/controllers/category.controller";

const router = Router();

router.get("/get", getCategoryHandler);

export default router;
