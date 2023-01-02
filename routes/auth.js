import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";

const router = express.Router();

// Auth Router

router.post("/", registerUser);

router.post("/", loginUser);

export default router;
