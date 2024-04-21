import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// users routes
import useRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import axios from "axios";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/comment.route.js";
import path from "path";
import cors from "cors";
//for build in render and deployment
const __dirname = path.resolve();
// create server using express
const app = express();
//parse middle ware
app.use(bodyParser.json());
app.use(cookieParser());
// security
// Load environment variables from .env file
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL).then(console.log("Mongodb database connected!"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
//  允许跨域请求（CORS）
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // 如果使用 cookies 或认证相关功能，确保开启此项
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// //
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://www.aaronblog.top",
//     "https://www.blogweb-f5rg.onrender.com",
//   ); // 只允许指定域名的跨域请求
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization", // 如果你的请求中包括认证等特殊头部，需要在此处添加
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // 明确允许的方法
//   res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.header("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });
//pass this path from this routes
app.use("/api/user", useRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

//static
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//middleware handle error！ next()
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 图片代理路由
// app.get("/api/image-proxy", async (req, res) => {
//   const url = req.query.url;
//   if (!url) {
//     return res.status(400).send("URL parameter is required");
//   }
//   try {
//     const response = await axios.get(url, {
//       responseType: "arraybuffer", // 指定响应类型为arraybuffer以获取原始二进制数据
//       responseEncoding: "binary", // 确保处理二进制数据
//     });
//     const body = response.data;
//     const contentType = response.headers["content-type"]; // 从响应头中获取实际的Content-Type
//     res.writeHead(200, {
//       "Content-Type": contentType, // 动态设置Content-Type
//       "Content-Length": body.length,
//     });
//     res.end(Buffer.from(body, "binary")); // 使用Buffer.from来处理二进制数据并发送响应
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to fetch image");
//   }
// });
