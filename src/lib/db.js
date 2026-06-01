import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;




if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  try {
    // Reuse existing connection
    if (cached.conn) {
      console.log("✅ Using existing MongoDB connection");
      return cached.conn;
    }

    // Create new connection
    if (!cached.promise) {
      console.log("🔌 Connecting to MongoDB...");
      console.log(
        "URI Found:",
        process.env.MONGODB_URI ? "YES" : "NO"
      );

      cached.promise = mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
    }

    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected Successfully");

    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error);

    cached.promise = null;

    throw error;
  }
};