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

import path from "path";
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;
console.log(__dirname);
//middleware

console.log("dirname" + __dirname);
app.use(morgan());
app.use(express.json());
app.use(cors());
// mongoConnect();
//api
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookrouter);
app.use("/api/v1/borrow", auth, borrowrouter);
app.use("/api/v1/comment", commentRouter);
//send file
app.use(express.static(__dirname + "/build"));
app.use("/", (req, res) => {
  console.log("root directory" + __dirname);
  res.sendFile(__dirname + "/index.html");
});
//database connection in cyclic
// const db =
//   process.env.NODE_ENV === "production"
//     ? process.env.MONGO_CLIENT
//     : "mongodb://localhost:27017/nottododb";

mongoose
  .connect(process.env.MONGO_CLIENT)
  .then(() => {
    console.log("Connected to mongo");
    app.listen(PORT, (error) => {
      console.log("Connected to port");
      error
        ? console.log(error.message)
        : console.log(`server run in port  http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

//root router
// app.use("/", (req, res) => {
//   res.json({
//     status: "success",
//     message: "api is running",
//   });
// });

// app.use("/", (req, res) => {
//   res.json({
//     status: "success",
//     message: "server is running properly",
//   });
// });

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is running on port ${PORT}`);
});
