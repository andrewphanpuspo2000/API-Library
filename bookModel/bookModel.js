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

export const findBook = async (search) => {
  const bookCol = await bookSchema.find();
  // console.log(bookCol);
  const searchRes = bookCol.filter((item) => item.title.includes(search));

  return searchRes;
};
