import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    isActive: {
      default: "active",
      type: String,
    },
    bookId: {
      type: String,
      required: true,
    },
    burrowId: {
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

    star: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentSchema);
