import express from "express";
import { createCategory, getAllCategory } from "../controllers/categories.js";

const router = express.Router();

// Categories Router

router.get("/", getAllCategory);

router.post("/", createCategory);

export default router;
