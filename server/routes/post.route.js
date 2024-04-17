import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create, getPosts,deletePost } from "../controllers/post.controller.js";

const postRoutes = express.Router();

postRoutes.post("/create", verifyUser, create);
//everyone can access
postRoutes.get('/getposts',getPosts)

postRoutes.delete("/deletepost/:postId/:userId",verifyUser,deletePost)
export default postRoutes;
