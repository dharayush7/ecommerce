import { Router } from "express";
import adminMiddleware from "@/middleware/admin.middleware";
import {
  createCategory,
  getCatergory,
  updateCategory,
} from "@/controllers/admin/category.controller";

const router = Router();

router.use(adminMiddleware);
router.get("/get", getCatergory);
router.post("/create", createCategory);
router.post("/update", updateCategory);

export default router;
