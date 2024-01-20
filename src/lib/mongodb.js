import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB connection is open.");
    } else {
      console.log("MongoDB connection is not open.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDb;
