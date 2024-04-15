import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";
const postRoutes = express.Router();

postRoutes.post("/create", verifyUser, create);

export default postRoutes;
