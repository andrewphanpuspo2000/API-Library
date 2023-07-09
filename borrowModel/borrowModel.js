import borrowSchema from "./borrowSchema.js";

export const addBorrow = (item) => {
  return borrowSchema(item).save();
};

export const getAllBorrow = () => {
  return borrowSchema.find();
};
export const getBurrowbyUserId = (id) => {
  return borrowSchema.find({ userId: id });
};
export const updateBorrowByBookId = (id, obj) => {
  return borrowSchema.findByIdAndUpdate(id, obj);
};
export const updateBorrow = (id, data) => {
  return borrowSchema.findByIdAndUpdate(id, data);
};

export const deleteBook = (id) => {
  return borrowSchema.deleteOne({ _id: id });
};

export const findBook = async (search) => {
  const bookCol = await borrowSchema.find();
  // console.log(bookCol);
  const searchRes = bookCol.filter((item) => item.title.includes(search));

  return searchRes;
};

export const findBorrowById = (id) => {
  return borrowSchema.findById(id);
};
