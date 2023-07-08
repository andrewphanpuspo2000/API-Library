import express from "express";
import { addBorrow, getAllBorrow } from "../borrowModel/borrowModel.js";
import { updateBook } from "../bookModel/bookModel.js";

const router = express.Router();

const twoWeeks = 14;

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + twoWeeks);
    req.body.dueDate = dueDate;

    const result = await addBorrow(req.body);
    if (result?._id) {
      const update = await updateBook(req.body.bookId, {
        isAvailable: false,
        dueDate,
      });
      if (update._id) {
        res.json({
          status: "success",
          message: "you have borrowed the book",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const collection = await getAllBorrow();
    if (collection.length) {
      res.json({
        status: "success",
        message: "data is retrived",
        result: collection,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
