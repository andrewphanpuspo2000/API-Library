import express from "express";
import { insertData } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "data is received",
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;

    req.body.password = hashPassword(password);

    const user = await insertData(req.body);
    console.log(user);
    user?._id
      ? res.json({
          status: "success",
          message: "new user has been added",
        })
      : res.json({
          status: "error",
          message: "data is not added",
        });
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      console.log("cannot have same email");
    } else {
      console.log(error.message);
    }
  }
});

export default router;
