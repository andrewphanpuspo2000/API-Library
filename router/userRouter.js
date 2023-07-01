import express from "express";
import { getUserByEmail, insertData } from "../models/user/UserModel.js";
import { checkPassword, hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    // get the data to compare the password with password from email in database
    // if it is match we can return success confirmation
    const { email, password } = req.query;
    const result = await getUserByEmail({ email });

    if (result._id) {
      const checkPass = checkPassword(password, result.password);
      result.password = undefined;
      console.log(checkPass);
      checkPass
        ? res.json({
            status: "success",
            message: "Login success",
            user: result,
          })
        : res.json({
            status: "error",
            message: "Password is not valid",
          });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "fail",
      message: "Email is not valid",
    });
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
