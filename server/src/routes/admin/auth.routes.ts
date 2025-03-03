import { Router } from "express";
import {
  loginHandler,
  resendOTPHandler,
  verificationHandler,
  forgetOtpHandler,
  verifyOtpHandler,
  chnagePasswordHandler,
} from "@/controllers/admin/auth.controller";

const router = Router();
router.post("/login", loginHandler);
router.post("/verification", verificationHandler);
router.post("/resend", resendOTPHandler);
router.post("/forget-password", forgetOtpHandler);
router.post("/verify-opts", verifyOtpHandler);
router.post("/change-password", chnagePasswordHandler);

export default router;
