import express from "express";
import {
  addBorrow,
  findBorrowById,
  getAllBorrow,
  updateBorrow,
} from "../borrowModel/borrowModel.js";
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
    const { role, _id } = req.userInfo;

    const collection =
      role === "admin" ? await getAllBorrow() : await getBurrowbyUserId(_id);

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

router.patch("/return", async (req, res) => {
  try {
    const { _id, bookId } = req.body;
    const getBorrow = await findBorrowById(_id);
    const returnTime = new Date();
    if (getBorrow?._id) {
      const result = await updateBook(bookId, {
        isAvailable: true,
        dueDate: null,
      });
      if (result?._id) {
        const update = await updateBorrow(_id, {
          returnDate: returnTime,
          isReturned: true,
        });

        update?._id
          ? res.json({
              status: "success",
              message: "book has been returned",
            })
          : res.json({
              status: "error",
              message: "Book has not been returned",
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

export default router;
