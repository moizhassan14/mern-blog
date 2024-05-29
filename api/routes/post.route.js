import express from 'express';
import { verifyToken } from '../utilis/verifyToken.js';
import { create ,getPosts} from '../controllers/post.controller.js';
const router=express.Router();
router.post("/create",verifyToken,create);
router.post("/getposts",getPosts);
export default router;