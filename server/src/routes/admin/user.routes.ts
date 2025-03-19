import { getUserAdminHandler } from "@/controllers/admin/user.controller";
import adminMiddleware from "@/middleware/admin.middleware";
import { Router } from "express";

const router = Router();
router.use(adminMiddleware);
router.get("/get", getUserAdminHandler);

export default router;
