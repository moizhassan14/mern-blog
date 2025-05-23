import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  getUser
} from "../controllers/user.controller.js";
import { verifyToken } from "../utilis/verifyToken.js";
const router = express.Router();
router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout",signOut);
router.get("/getusers",verifyToken,getUsers);
router.get("/:userId",getUser)

export default router;
