import { Router } from "express";
import {
  login,
  logout,
  signup,
  getMe,
  getAllUsers,
} from "../controllers/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router = Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", protectRoute, getAllUsers);

export default router;
