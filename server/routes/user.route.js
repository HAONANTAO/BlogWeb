import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const useRoutes = express.Router();

// update
useRoutes.put("/update/:userId", verifyUser, updateUser);
useRoutes.delete("/delete/:userId", verifyUser, deleteUser);
useRoutes.post("/signout/:userId", signout);
export default useRoutes;
