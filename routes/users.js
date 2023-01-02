import express from "express";
import { updateUser, deleteUser, getUserById } from "../controllers/users.js";

const router = express.Router();

// Users ROuters
// @routes Update /users/:id
// @description Update User account
router.put("/:id", updateUser);

// @routes Delete /users/:id
// @description Delete a User
router.delete("/:id", deleteUser);

// @routes Get /users/:id
// @description Get User account
router.get("/:id", getUserById);

export default router;
