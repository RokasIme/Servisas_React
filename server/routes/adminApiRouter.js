import express from "express";
import { getLogout } from "../api/admin/getLogout.js";
import { getAllCategories } from "../api/admin/getAllCategories.js";
import { getAllMasters } from "../api/admin/getAllMasters.js";
import { categoriesDelete } from "../api/admin/categoriesDelete.js";
import { categoriesPost } from "../api/admin/categoriesPost.js";
import { categoriesPut } from "../api/admin/categoriesPut.js";
import { mastersDelete } from "../api/admin/mastersDelete.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { apiUpload } from "../api/admin/apiUpload.js";
import { mastersPost } from "../api/admin/mastersPost.js";
import { mastersPut } from "../api/admin/mastersPut.js";
import { workshopDelete } from "../api/admin/workshopsDelete.js";
import { workshopsPost } from "../api/admin/workshopsPost.js";
import { workshopsPut } from "../api/admin/workshopsPut.js";

export const adminApiRouter = express.Router();

adminApiRouter.get("/logout", getLogout);

adminApiRouter.get("/categories", getAllCategories);
adminApiRouter.post("/categories", categoriesPost);
adminApiRouter.put("/categories/:id", categoriesPut);
adminApiRouter.delete("/categories/:id", categoriesDelete);

adminApiRouter.get("/masters", getAllMasters);
adminApiRouter.post("/masters", mastersPost);
adminApiRouter.put("/masters/:id", mastersPut);
adminApiRouter.delete("/masters/:id", mastersDelete);

adminApiRouter.delete("/workshops/:id", workshopDelete);
adminApiRouter.post("/workshops", workshopsPost);
adminApiRouter.put("/workshops/:id", workshopsPut);

adminApiRouter.post("/upload", uploadImage.single("thumbnail"), apiUpload);

adminApiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such admin  API route exists",
  });
});
