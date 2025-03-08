import { Router } from "express";
import {
  loginHandler,
  resendHandler,
  userVerificationHandler,
} from "@/controllers/auth.controller";

const router = Router();

router.post("/login", loginHandler);
router.post("/resend", resendHandler);
router.post("/verify", userVerificationHandler);

export default router;
