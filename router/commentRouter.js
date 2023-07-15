import express from "express";
import {
  addComment,
  getAllComment,
  updateComment,
} from "../commentModel/commentModel.js";
import { auth } from "../AuthMiddleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getAllComment();
    result
      ? res.json({
          status: "success",
          message: "Data is retrieved",
          comments: result,
        })
      : res.json({
          status: "error",
          message: "Data can not be retrieved",
        });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const result = await addComment(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Comment is saved",
        })
      : res.json({
          status: "error",
          message: "Data can not be retrieved",
        });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const { id, isActive } = req.body;
    const result = await updateComment(id, { isActive });
    if (result) {
      res.json({
        status: "success",
        message: "Activation is updated",
      });
    }
  } catch (ERROR) {
    res.json({
      status: "success",
      message: ERROR.message,
    });
  }
});
export default router;
