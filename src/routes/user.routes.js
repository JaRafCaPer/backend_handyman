import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);

router.put("/update", authMiddleware, updateUser);

router.delete('/delete', authMiddleware, roleMiddleware(['admin']), deleteUser);

export default router;
