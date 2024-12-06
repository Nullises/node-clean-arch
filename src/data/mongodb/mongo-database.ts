import mongoose from "mongoose";

interface MongoDatabaseProps {
  url: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect({ url, dbName }: MongoDatabaseProps) {
    try {
      const connected = await mongoose.connect(url, {
        dbName: dbName,
      });
      if (connected) {
        console.log("Connected to MongoDB");
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("MongoDB connection failed");
    }
  }
}
