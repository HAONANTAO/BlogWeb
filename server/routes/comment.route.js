import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";
const commentRoutes = express.Router();

commentRoutes.post("/create", verifyUser, createComment);
commentRoutes.get("/getPostComments/:postId", getPostComments);

export default commentRoutes;
