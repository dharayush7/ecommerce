import { Router } from "express";
import {
  loginHandler,
  resendOTPHandler,
  verificationHandler,
} from "@/controllers/admin/auth.controller";

const router = Router();
router.post("/login", loginHandler);
router.post("/verification", verificationHandler);
router.post("/resend", resendOTPHandler);

export default router;
