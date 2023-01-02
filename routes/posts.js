import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

// Posts Routers

// @routes Get /posts
// @description Get ALl Posts
router.get("/", getAllPosts);

// @routes Get /posts/:id
// @description Get Posts by Id
router.get("/:id", getPostById);

// @routes Get /posts/:id
// @description Create Posts
router.post("/", createPost);

// @routes Update /posts/:id
// @description Update Posts
router.put("/:id", updatePost);

// @routes Delete /post/:id
// @description Delete posts
router.delete("/:id", deletePost);

export default router;
