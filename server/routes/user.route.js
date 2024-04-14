import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifytUser } from "../utils/verifyUser.js";
const useRoutes = express.Router();

// update
useRoutes.put("/update/:userId", verifytUser, updateUser);
export default useRoutes;
