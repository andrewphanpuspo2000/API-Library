import mongoose, { Mongoose } from "mongoose";

const borrowSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
    default: null,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  returnDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Borrow", borrowSchema);
