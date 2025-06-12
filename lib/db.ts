import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

const clientOptions = {
  serverApi: { version: "1" as const, strict: true, deprecationErrors: true },
};

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return;
  }
  await mongoose.connect(uri, clientOptions);
  if (mongoose.connection.db) {
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } else {
    throw new Error("Database connection is undefined.");
  }
}

export default dbConnect;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// async function dbConnect() {
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }

//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// }

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }
// declare global {
//   // eslint-disable-next-line no-var
//   var mongo: any;
// }

// let cached = global.mongo;
// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose
//       .connect(MONGODB_URI, opts)
//       .then((mongooseInstance) => {
//         return mongooseInstance;
//       });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
