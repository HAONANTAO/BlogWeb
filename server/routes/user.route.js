import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js";
import { verifytUser } from "../utils/verifyUser.js";
const useRoutes = express.Router();

// update
useRoutes.put("/update/:userId", verifytUser, updateUser);
useRoutes.delete("/delete/:userId", verifytUser, deleteUser);
useRoutes.post("/signout/:userId", signout);
export default useRoutes;
