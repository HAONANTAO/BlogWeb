/*
 * @Date: 2024-05-15 13:48:48
 * @LastEditors: 陶浩南 14639548+haonantao-aaron@user.noreply.gitee.com
 * @LastEditTime: 2025-03-11 22:42:51
 * @FilePath: /BlogWeb/server/index.js
 */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
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

//parse middle ware
app.use(bodyParser.json());
app.use(cookieParser());

// 静态文件服务
app.use(express.static(path.join(__dirname, "server/public")));

// security
// Load environment variables from .env file
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Mongodb database connected!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

//  允许跨域请求（CORS）
app.use(
  cors({
    origin: "https://blog-web-eight-zeta.vercel.app", // 允许的前端 URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// 路由设置
app.use("/api/user", useRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

//静态文件
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// middleware handle error！ next()
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
