import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createComment } from "../controllers/comment.controller.js";
const commentRoutes = express.Router();

commentRoutes.post("/create", verifyUser, createComment);

export default commentRoutes;
