import express from "express";
import { addComment, getAllComment } from "../commentModel/commentModel.js";

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
          message: "Data ca not be retrieved",
        });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await addComment(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Comment is saved",
        })
      : res.json({
          status: "error",
          message: "Data ca not be retrieved",
        });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
});
export default router;
