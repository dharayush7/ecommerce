import userMiddleware from "@/middleware/user.middleware";
import { Router } from "express";
import {
  addAddressHandler,
  deleteAddressHandeler,
  getAddressHandeler,
  updateAddressHandler,
} from "@/controllers/address.controller";

const router = Router();
router.use(userMiddleware);

router.get("/get", getAddressHandeler);
router.post("/add", addAddressHandler);
router.post("/update", updateAddressHandler);
router.get("/delete/:id", deleteAddressHandeler);

export default router;
