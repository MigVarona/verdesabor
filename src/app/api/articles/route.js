// app/api/articles/route.js

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const getArticles = async () => {
  try {
    await client.connect();
    const db = client.db("verdesabor");  
    const collection = db.collection("articles");  
    const articles = await collection.find().toArray();
    return articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
    throw error;
  } finally {
    await client.close();
  }
};

export async function GET() {
  try {
    const articles = await getArticles();

    if (!articles || articles.length === 0) {
      return new Response(JSON.stringify({ message: "No hay artículos disponibles" }), { status: 404 });
    }

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error al obtener los artículos", error: error.message }),
      { status: 500 }
    );
  }
}
