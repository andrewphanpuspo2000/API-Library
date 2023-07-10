import commentSchema from "./commentSchema.js";

export const addComment = (comment) => {
  return commentSchema(comment).save();
};

export const getAllComment = () => {
  return commentSchema.find();
};
