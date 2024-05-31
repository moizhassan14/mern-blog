import express from "express";
import { verifyToken } from "../utilis/verifyToken.js";
import {
  create,
  getPosts,
  deletePost,
  updateUser
} from "../controllers/post.controller.js";
const router = express.Router();
router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
router.put("/update/:postId/:userId",verifyToken,updateUser)
export default router;
