import express from "express";
import { getAllCategories } from "../api/getAllCategories.js";
import { getAllMasters } from "../api/getAllMasters.js";
import { getMastersByCategory } from "../api/getMastersByCategory.js";
import { getAllWorkshops } from "../api/getAllWorkshops.js";

export const apiRouter = express.Router();

apiRouter.get("/categories", getAllCategories);

apiRouter.get("/masters", getAllMasters);
apiRouter.get("/masters/:category", getMastersByCategory);

apiRouter.get("/workshops", getAllWorkshops);

// apiRouter.get("/userLikes", getAllMasters);

http: apiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such API route exists",
  });
});
