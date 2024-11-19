import { createError } from "../error.js";
import { config } from "dotenv";
import OpenAI from "openai";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createImage = async (req, res, next) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "a white dog",
      n: 1,
      size: "1024x1024",
    });
    const image_data = response.data[0];
    const image_url = image_data.url;
    res.status(201).json({ success: true, data: image_data, image_url });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

export { createImage };
