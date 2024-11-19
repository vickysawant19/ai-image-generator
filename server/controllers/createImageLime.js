import fetch from "node-fetch";
import { config } from "dotenv";
config();

const createImageWithLime = async (req, res, next) => {
  const { prompt, negative_prompt } = req.body;

  try {
    const resp = await fetch("https://api.limewire.com/api/image/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.LIME_API}`,
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: negative_prompt || "",
        samples: 1,
        quality: "LOW",
        guidance_scale: 50,
        aspect_ratio: "1:1",
        style: "PHOTOREALISTIC",
      }),
    });
    const data = await resp.json();
    res.status(201).json({ success: true, data: data });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

export { createImageWithLime };
