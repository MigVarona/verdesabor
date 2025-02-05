// lib/mongodb.js
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const getArticleBySlug = async (slug) => {
  try {
    await client.connect();
    const database = client.db("your-database-name");
    const collection = database.collection("articles");
    const article = await collection.findOne({ slug });
    return article;
  } finally {
    await client.close();
  }
};
