/**
 * File: server/config/db.js
 * Purpose: Initialize and export a singleton MongoDB connection using Mongoose.
 *
 * How it works:
 * - Reads `MONGO_URI` from environment variables
 * - Enables `strictQuery` for safer query filters
 * - Connects with modern URL parser and topology engine
 * - Logs the connected host or exits process on failure
 */
import mongoose from 'mongoose';

/**
 * Establishes a MongoDB connection for the Node process.
 * Returns nothing — subsequent Mongoose model operations reuse this connection.
 */
const connectDB = async () => {
  try {
    // `strictQuery` prevents querying by fields not in schemas by default
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;