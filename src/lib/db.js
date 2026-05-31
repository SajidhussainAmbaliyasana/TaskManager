import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  // Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Create connection only once
  if (!cached.promise) {
    console.log("🔌 Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB Connected");

  return cached.conn;
};