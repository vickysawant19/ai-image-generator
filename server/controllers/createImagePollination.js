import axios from "axios";
import { createError } from "../error.js";

export const createImageWithPollination = async (req, res, next) => {
  const { prompt } = req.body;

  try {
    console.log(encodeURIComponent(prompt));
    const response = await axios.get(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
      {
        responseType: "arraybuffer",
      }
    );

    const imageData = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    const contentType = response.headers["content-type"];
    const base64Image = `data:${contentType};base64,${imageData}`;

    res.status(201).json({ success: true, data: base64Image });
  } catch (error) {
    console.error("Error fetching image from Pollination API:", error);

    // Proper error handling
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
