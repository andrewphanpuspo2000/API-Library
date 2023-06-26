import userSchema from "./UserSchemas.js";

export const insertData = (obj) => {
  return userSchema(obj).save();
};

export const getData = (item) => {
  return userSchema.find(item);
};
