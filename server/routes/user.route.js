import express from "express";
import { test, normal } from "../controllers/user.controller.js";
const useRoutes = express.Router();

useRoutes.get("/", test);
useRoutes.get("/test", normal);
export default useRoutes;
