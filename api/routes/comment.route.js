import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import { createCommment } from "../controllers/comment.controller.js";
const router = express.Router();
router.post("/create", verifyToken, createCommment);
export default router;
