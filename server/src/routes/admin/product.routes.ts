import { Router } from "express";
import {
  addProductHandler,
  changeProductStatus,
  getProductByIdHandler,
  getProductHandler,
  imageUplaod,
  updateMediaOfProduct,
  updateProductHandler,
} from "@/controllers/admin/product.controller";
import adminMiddleware from "@/middleware/admin.middleware";

const router = Router();

router.use(adminMiddleware);

router.post("/add", addProductHandler);
router.get("/get", getProductHandler);
router.get("/get/:id", getProductByIdHandler);
router.get("/change-status/:id", changeProductStatus);
router.post("/update", updateProductHandler);
router.post("/update-media", updateMediaOfProduct);
router.post("/upload", imageUplaod);

export default router;
