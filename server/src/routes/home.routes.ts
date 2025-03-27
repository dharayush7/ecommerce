import { Router } from "express";
import { getData } from "@/controllers/home.controller";

const router = Router();

router.get("/get", getData);

export default router;
