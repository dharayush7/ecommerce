import { Router } from "express";
import {
  addManegerHandler,
  deleteManegerHandler,
  getManegerHandler,
  updateManegerHandler,
  updatePermissionOfManegerHandler,
} from "@/controllers/admin/maneger.controller";
import adminMiddleware from "@/middleware/admin.middleware";

const router = Router();

router.use(adminMiddleware);

router.get("/get", getManegerHandler);
router.post("/add", addManegerHandler);
router.post("/update", updateManegerHandler);
router.post("/permission/update", updatePermissionOfManegerHandler);
router.post("/delete", deleteManegerHandler);

export default router;
