require("module-alias/register");
import express from "express";
import cookieParser from "cookie-parser";
import adminAuthRouter from "@/routes/admin/auth.routes";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());
  app.use(cookieParser());

  app.get("/status", (req, res) => {
    res.json({ msg: "Online" });
  });

  app.use("/admin/auth", adminAuthRouter);

  app.listen(PORT, () => {
    console.log(`Server started at port:${PORT}`);
  });
}

init();
