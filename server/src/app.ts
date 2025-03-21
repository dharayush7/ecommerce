require("module-alias/register");
import express from "express";
import cors from "cors";
import adminAuthRouter from "@/routes/admin/auth.routes";
import adminManegerRouter from "@/routes/admin/maneger.routes";
import adminProductRouter from "@/routes/admin/product.routes";
import uploadRouter from "@/routes/admin/upload.routes";
import adminCategotyRouter from "@/routes/admin/category.routes";
import adminUserRouter from "@/routes/admin/user.routes";
import authRouter from "@/routes/auth.routes";
import productRouter from "@/routes/product.routes";
import categoryRouter from "@/routes/category.routes";
import tagRouter from "@/routes/tag.routes";
import cartRouter from "@/routes/cart.routes";
import profileRouter from "@/routes/profile.routes";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());
  app.use(cors());

  app.get("/status", (_req, res) => {
    res.json({ msg: "Online" });
  });

  app.use((req, _res, next) => {
    const time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, time);
    next();
  });

  app.use("/admin/auth", adminAuthRouter);
  app.use("/admin/maneger", adminManegerRouter);
  app.use("/admin/product", adminProductRouter);
  app.use("/admin/category", adminCategotyRouter);
  app.use("/admin/user", adminUserRouter);
  app.use("/admin/upload", uploadRouter);

  app.use("/auth", authRouter);
  app.use("/profile", profileRouter);
  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/tag", tagRouter);
  app.use("/cart", cartRouter);

  app.listen(PORT, () => {
    console.log(`Server started at port:${PORT}`);
  });
}

init();
