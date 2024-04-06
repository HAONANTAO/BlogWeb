import express from "express";

const useRoutes = express.Router();

useRoutes.get("/", (req, res) => {
  res.json({ message: "User API Working!!!" });
});
useRoutes.get("/test", (req, res) => {
  res.json({ message: "User API test Working!!!" });
});
export default useRoutes;
