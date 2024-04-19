import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const postRoutes = express.Router();

postRoutes.post("/create", verifyUser, create);
//everyone can access
postRoutes.get("/getposts", getPosts);

postRoutes.delete("/deletepost/:postId/:userId", verifyUser, deletePost);
postRoutes.put("/updatepost/:postId/:userId", verifyUser, updatePost);


export default postRoutes;
