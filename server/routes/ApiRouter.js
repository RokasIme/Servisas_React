import express from "express";
import { getAllCategories } from "../api/getAllCategories.js";
import { getAllMasters } from "../api/getAllMasters.js";

export const apiRouter = express.Router();

apiRouter.get("/categories", getAllCategories);

apiRouter.get("/masters", getAllMasters);
apiRouter.get("/masters/:category", getAllMasters);

apiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such API route exists",
  });
});
