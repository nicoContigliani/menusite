
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =  process.env.NEXT_PUBLIC_MONGO_URI_ATLAS ||`mongodb+srv://usuario:ch8piRaA4WKxa3hi@clusterllakascript.tv2rm.mongodb.net/menuDB?retryWrites=true&w=majority`;
// console.log( process.env.MONGO_URI_ATLAS,"*************MONGO_URI_ATLAS************")
console.log("🚀 ~ uri**********************************************:", uri)

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