import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  bookId: {
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
  comment: {
    type: String,
    required: true,
  },
});

export default mongoose.model("comment", commentSchema);
