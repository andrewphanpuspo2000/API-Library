import { getUserById } from "../models/user/UserModel.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const user = await getUserById(authorization);
    console.log(user);
    if (user?._id) {
      user.password = undefined;
      req.userInfo = user;
      return next();
    }
    res.json({
      status: "error",
      message: "can not access API",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const { role } = req.userInfo;
    role === "admin"
      ? next()
      : res.json({
          status: "error",
          message: "you are not admin",
        });
    console.log(role);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
