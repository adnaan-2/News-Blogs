import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define the global type extension
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/news-blogging';

// Initialize cache properly
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Save to global
if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log("Using existing MongoDB connection");
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log("Creating new MongoDB connection...");
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log("MongoDB connected successfully");
          return mongoose;
        });
    } else {
      console.log("Using existing connection promise");
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Reset cache on error to allow retry
    cached.promise = null;
    throw error;
  }
}

export default connectDB;