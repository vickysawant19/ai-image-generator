import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./routes/postRoutes.js";
import createImageRouter from "./routes/createImageRoutes.js";

config();

const app = express();
const PORT = process.env.PORT || PORT;

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://ai-image-generator-client-omega.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//Deafult get
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

//API routes
app.use("/api/post", postRouter);
app.use("/api/generate", createImageRouter);

//Error  handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

async function connectMongodb(params) {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
      console.log("MongoDB connected!");
    })
    .catch((err) => {
      console.error(err);
    });
}

//Function to start server
async function startServer(params) {
  try {
    connectMongodb();
    app.listen(PORT, () => {
      console.log("Server connected!");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
