import express from "express";
import { getAllCategories } from "../api/getAllCategories.js";
import { getAllMovies } from "../api/getAllMovies.js";

export const apiRouter = express.Router();

apiRouter.get("/categories", getAllCategories);

apiRouter.get("/movies", getAllMovies);

apiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such API route exists",
  });
});
