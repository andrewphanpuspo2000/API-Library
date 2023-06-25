import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CLIENT);

    console.log("mongo is connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default mongoConnect;
