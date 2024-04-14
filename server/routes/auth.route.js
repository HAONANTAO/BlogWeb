import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const authRoutes = express.Router();
authRoutes.post("/test", async (req, res) => {
  res.json("trest");
});
authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/google", google);

export default authRoutes;
