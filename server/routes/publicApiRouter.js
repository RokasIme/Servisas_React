import express from "express";
import { postRegister } from "../api/public/postRegister.js";
import { postLogin } from "../api/public/postLogin.js";
import { getLogin } from "../api/public/getLogin.js";
import { getAllCategories } from "../api/public/getAllCategories.js";
import { getAllMasters } from "../api/public/getAllMasters.js";
import { getAllWorkshops } from "../api/public/getAllWorkshops.js";

export const publicApiRouter = express.Router();

publicApiRouter.post("/register", postRegister);
publicApiRouter.post("/login", postLogin);
publicApiRouter.get("/login", getLogin);

publicApiRouter.get("/categories", getAllCategories);

publicApiRouter.get("/masters", getAllMasters);

publicApiRouter.get("/workshops", getAllWorkshops);

publicApiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such public API route exists",
  });
});
