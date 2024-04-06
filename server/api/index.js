import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// 创建服务器express
const app = express();

// 安全问题 从env拿到数据库连接和密码
// Load environment variables from .env file
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL).then(console.log("connected"));
app.listen(3000, () => {
  console.log("listening");
});
