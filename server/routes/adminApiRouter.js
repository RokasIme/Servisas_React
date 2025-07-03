import express from "express";
import { getLogout } from "../api/admin/getLogout.js";
import { getAllCategories } from "../api/admin/getAllCategories.js";

export const adminApiRouter = express.Router();

adminApiRouter.get("/logout", getLogout);

adminApiRouter.get("/categories", getAllCategories);

adminApiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such admin  API route exists",
  });
});
