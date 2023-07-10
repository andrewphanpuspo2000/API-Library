import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
import mongoConnect from "./config/mongoConnect.js";
import express from "express";
import userRouter from "./router/userRouter.js";
import bookrouter from "./router/bookRouter.js";
import borrowrouter from "./router/borrowRouter.js";
import { auth } from "./AuthMiddleware/authMiddleware.js";
import commentRouter from "./router/commentRouter.js";

const app = express();

const PORT = process.env.PORT || 8000;
//middleware
app.use(morgan());
app.use(express.json());
app.use(cors());
mongoConnect();
//api
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookrouter);
app.use("/api/v1/borrow", auth, borrowrouter);
app.use("/api/v1/comment", commentRouter);
//root router
app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "api is running",
  });
});

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running properly",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is running on port ${PORT}`);
});
