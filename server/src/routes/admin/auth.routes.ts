import { Router } from "express";
import {
  loginHandler,
  verificationHandler,
} from "@/controllers/admin/auth.controller";

const router = Router();
router.post("/login", loginHandler);
router.post("/verification", verificationHandler);

export default router;
