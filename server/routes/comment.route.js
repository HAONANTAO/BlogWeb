import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
} from "../controllers/comment.controller.js";
const commentRoutes = express.Router();

commentRoutes.post("/create", verifyUser, createComment);
commentRoutes.get("/getPostComments/:postId", getPostComments);

commentRoutes.put("/likeComment/:commentId", verifyUser, likeComment);

commentRoutes.put("/editComment/:commentId", verifyUser, editComment);

export default commentRoutes;
