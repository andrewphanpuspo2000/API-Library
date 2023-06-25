import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
