// import mongoose, { Mongoose } from "mongoose";

// const MONGODB_URI: string = process.env.NEXT_PUBLIC_MONGO_URI_ATLAS || "";

// interface Cached {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }

// declare global {
//   var mongoose: Cached;
// }

// let cached: Cached = global.mongoose || { conn: null, promise: null };

// if (!global.mongoose) {
//   global.mongoose = cached;
// }

// export async function connectToDatabase(): Promise<Mongoose> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       console.log("Mongoose connected!");
//       return mongoose;
//     });

//     mongoose.connection.on("error", (err) => {
//       console.error("Mongoose connection error:", err);
//     });

//     mongoose.connection.on("disconnected", () => {
//       console.log("Mongoose disconnected!");
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     cached.promise = null;
//     throw error;
//   }
// }

import { MongoClient, ServerApiVersion } from "mongodb";

const uri =  process.env.NEXT_PUBLIC_MONGO_URI_ATLAS ||`mongodb+srv://usuario:ch8piRaA4WKxa3hi@clusterllakascript.tv2rm.mongodb.net/menuDB?retryWrites=true&w=majority`;
// console.log( process.env.MONGO_URI_ATLAS,"*************MONGO_URI_ATLAS************")

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (
  // process.env.NODE_ENV === "development"
  true
) {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;