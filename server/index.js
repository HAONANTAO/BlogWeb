import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import useRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import path from "path";
import cors from "cors";

//for build in render and deployment
const __dirname = path.resolve();

// create server using express
const app = express();

// 设置 COOP 和 COEP 头
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// parse middle ware
app.use(bodyParser.json());
app.use(cookieParser());

// security
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Mongodb database connected!"));

// CORS - 允许来自前端的请求
app.use(
  cors({
    origin: [
      // 允许访问的域名白名单
      "https://blog-web-eight-zeta.vercel.app", // 你的生产环境前端地址
      "http://localhost:3000/", // 开发环境地址（如 http://localhost:5173）
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // 允许的 HTTP 方法
    credentials: true, // 允许发送 Cookie 和认证头信息
  }),
);

// 路由设置
app.use("/api/user", useRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// 静态文件服务
// 仅在生产环境启用静态文件服务（非Vercel环境）
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));
}
// Catch-all route to serve index.html for any non-API requests (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// middleware handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
