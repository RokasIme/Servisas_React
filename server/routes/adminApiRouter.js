import express from "express";
import { getLogout } from "../api/admin/getLogout.js";

export const adminApiRouter = express.Router();

adminApiRouter.get("/logout", getLogout);
