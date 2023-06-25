import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running properly",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is running on port${PORT}`);
});
