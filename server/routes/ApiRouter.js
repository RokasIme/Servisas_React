import express from "express";
import { getAllCategories } from "../api/getAllCategories.js";
import { getAllMasters } from "../api/getAllMasters.js";
import { getMastersByCategory } from "../api/getMastersByCategory.js";
import { getAllWorkshops } from "../api/getAllWorkshops.js";
import { postRegister } from "../api/postRegister.js";
import { postLogin } from "../api/postLogin.js";
import { getLogin } from "../api/getLogin.js";
import { getLogout } from "../api/getLogout.js";

export const apiRouter = express.Router();

apiRouter.post("/register", postRegister);
apiRouter.post("/login", postLogin);
apiRouter.get("/login", getLogin);
apiRouter.get("/logout", getLogout);

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
