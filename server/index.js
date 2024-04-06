import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// users 路由
import useRoutes from "./routes/user.route.js";

// 创建服务器express
const app = express();

// 安全问题 从env拿到数据库连接和密码
// Load environment variables from .env file
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL).then(console.log("Mongodb database connected!"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// 这个路径过这个路由
app.use("/api/user", useRoutes);