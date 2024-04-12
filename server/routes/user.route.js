import express from "express";
import { normal, updateUser } from "../controllers/user.controller.js";
import { veriftUser } from "../utils/verifyUser.js";
const useRoutes = express.Router();

useRoutes.get("/test", normal);
// update
useRoutes.put("/update:userId", veriftUser, updateUser);
export default useRoutes;
