import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
import mongoConnect from "./config/mongoConnect.js";
import express from "express";
import userRouter from "./router/userRouter.js";
import bookrouter from "./router/bookRouter.js";
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
//root router
app.use("/", (req, res) => {
  res.json({
    status: "succes",
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
