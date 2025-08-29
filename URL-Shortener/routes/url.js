import express from "express";
import { createUrl, getAnalytics, getUrl } from "../controllers/url.js";
const router = express.Router();

router.post("/", createUrl);
router.get("/:shortID" , getUrl);
router.get("/analytics/:shortID" , getAnalytics)

export default router;