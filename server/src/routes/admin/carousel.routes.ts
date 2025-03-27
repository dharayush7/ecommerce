import { Router } from "express";
import { addCarousel } from "@/controllers/admin/carousel.controller";

const router = Router();
router.post("/add", addCarousel);

export default router;
