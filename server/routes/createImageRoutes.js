import express from "express";
// import { createImage } from "../controllers/createImage.js";  //openAi no free credits
// import { createImageWithLime } from "../controllers/createImageLime.js";
import { createImageWithPollination } from "../controllers/createImagePollination.js";

const router = express.Router();

router.post("/", createImageWithPollination);

export default router;
