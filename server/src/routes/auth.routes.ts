import { Router } from "express";
import {
  loginHandler,
  userVerificationHandler,
} from "@/controllers/auth.controller";

const router = Router();

router.post("/login", loginHandler);
router.post("/verify", userVerificationHandler);

export default router;
