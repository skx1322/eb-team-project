import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = 8080 || process.env.BACKEND_PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    message: `EB-Server is running with port ${PORT}`,
  });
});

app.use(`/api/`, userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`EB-Server is running on port ${PORT}`);
  });
});
