import { Router } from "express";
import { loginUser, registerUser, verifyToken } from "../controllers/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-token", verifyToken);

export default router;
