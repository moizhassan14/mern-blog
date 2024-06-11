import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import {
  createCommment,
  getPostComments,
  likeComment,
  editComment,
} from "../controllers/comment.controller.js";
const router = express.Router();
router.post("/create", verifyToken, createCommment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
export default router;
