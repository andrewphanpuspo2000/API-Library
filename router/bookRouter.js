import express from "express";
import {
  deleteBook,
  findBook,
  getAllBooks,
  storeBook,
  updateBook,
} from "../bookModel/bookModel.js";
import { adminAuth, auth } from "../AuthMiddleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, adminAuth, async (req, res) => {
  try {
    const result = await storeBook(req.body);

    result?.id
      ? res.json({
          status: "success",
          message: "new book has been added",
        })
      : json({
          status: "error",
          message: "Error, can not add book ",
        });
    console.log(req.body);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await getAllBooks();
    res.json({
      status: "success",
      message: "success to get books",
      books: result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/", auth, adminAuth, async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const result = await updateBook(_id, rest);

    result?._id
      ? res.json({
          status: "success",
          message: "data has been updated",
        })
      : res.json({
          status: "fail",
          message: "data is not stored",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:_id", auth, adminAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await deleteBook(_id);
    console.log(result);
    res.json({
      status: "success",
      message: "Book has been deleted",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const result = await findBook(search);

    result
      ? res.json({
          status: "success",
          message: result,
        })
      : res.json({
          status: "error",
          message: result,
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
