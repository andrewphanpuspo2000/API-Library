import userSchema from "./UserSchemas.js";

export const insertData = (obj) => {
  return userSchema(obj).save();
};

export const getUserByEmail = (item) => {
  return userSchema.findOne(item);
};
export const getUserById = (item) => {
  return userSchema.findById(item);
};
