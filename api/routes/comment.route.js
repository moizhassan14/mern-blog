import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import { createCommment , getPostComments } from "../controllers/comment.controller.js";
const router = express.Router();
router.post("/create", verifyToken, createCommment);
router.get("/getPostComments/:postId",getPostComments);
export default router;
