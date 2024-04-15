import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifytUser } from "../utils/verifyUser.js";
const useRoutes = express.Router();

// update
useRoutes.put("/update/:userId", verifytUser, updateUser);
useRoutes.delete("/delete/:userId", verifytUser, deleteUser);
export default useRoutes;
