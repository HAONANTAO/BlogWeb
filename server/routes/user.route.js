import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const useRoutes = express.Router();

// update
useRoutes.put("/update/:userId", verifyUser, updateUser);
useRoutes.delete("/delete/:userId", verifyUser, deleteUser);
useRoutes.post("/signout/:userId", signout);
useRoutes.get("/getusers", verifyUser, getUsers);

//for comment one
useRoutes.get("/:userId", getUser);

export default useRoutes;
