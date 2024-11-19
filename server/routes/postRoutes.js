import express from "express";
import { createPost, getAllPost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPost).post("/", createPost);

export default router;
