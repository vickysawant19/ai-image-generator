import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPost).post("/", createPost).delete("/:id", deletePost);

export default router;
