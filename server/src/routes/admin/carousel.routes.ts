import { Router } from "express";
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
} from "@/controllers/admin/carousel.controller";
import adminMiddleware from "@/middleware/admin.middleware";

const router = Router();

router.use(adminMiddleware);

router.get("/get", getCarousel);
router.post("/add", addCarousel);
router.post("/delete", deleteCarousel);

export default router;
