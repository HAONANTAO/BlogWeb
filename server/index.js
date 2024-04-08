import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// users 路由
import useRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import bodyParser from "body-parser";
// create server using express
const app = express();
//parse middle ware
app.use(bodyParser.json());
// security
// Load environment variables from .env file
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL).then(console.log("Mongodb database connected!"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});

//pass this path from this routes
app.use("/api/user", useRoutes);
app.use("/api/auth", authRoutes);
