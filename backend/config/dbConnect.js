import mongoose from "mongoose";

const dbConnect = async () => {
  console.log("Mongoose connection state:", mongoose.connection.readyState);

  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true, // Avoids deprecation warnings
      useUnifiedTopology: true, // Enables new connection management engine
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process with failure in case of connection error
  }
};

export default dbConnect;
