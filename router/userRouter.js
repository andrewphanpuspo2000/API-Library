import express from "express";
import { getData, insertData } from "../models/user/UserModel.js";
import { checkPassword, hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { email, password } = req.query;
    const result = await getData({ email });
    if (result.length) {
      result.map((item, i) => {
        let check = checkPassword(password, item.password);
        console.log(check);
        if (check) {
          res.json({
            status: "success",
            message: result,
          });
        }
        return;
      });
    }
    res.json({
      status: "fail",
    });
    console.log(result);
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