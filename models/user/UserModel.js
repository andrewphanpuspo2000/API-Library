import userSchema from "./UserSchemas.js";

export const insertData = (obj) => {
  return userSchema(obj).save();
};
