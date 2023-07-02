import bookSchema from "./bookSchema.js";

export const storeBook = (item) => {
  return bookSchema(item).save();
};

export const getAllBooks = () => {
  return bookSchema.find();
};

export const updateBook = (id, data) => {
  return bookSchema.findByIdAndUpdate(id, data);
};

export const deleteBook = (id) => {
  return bookSchema.deleteOne({ _id: id });
};
