import { Router } from "express";
import userMiddleware from "@/middleware/user.middleware";
import { getProfile, updateProfile } from "@/controllers/profile.controller";

const router = Router();

router.use(userMiddleware);
router.get("/get", getProfile);
router.post("/update", updateProfile);

export default router;
