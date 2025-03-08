import { Router } from "express";
import { getTagHandler } from "@/controllers/tag.controller";

const router = Router();
router.get("/get", getTagHandler);

export default router;
