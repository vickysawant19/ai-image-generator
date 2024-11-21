import Post from "../models/postModel.js";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      photo: photoUrl?.secure_url,
      prompt,
    });
    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required" });
    }
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error.message || "An unexpected error occurred"
      )
    );
  }
};

export { getAllPost, createPost, deletePost };
