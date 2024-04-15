import { errorHandler } from "../utils/errorHandler.js";
import Post from "../models/post.model.js";
export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You not allow to create the post!"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all needed information!"));
  }
  // ”通常指的是一个用于URL中的标识符，它是一个易于阅读的、URL友好的形式
  const slug = req.body.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
