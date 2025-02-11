// app/api/articles/route.js

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getArticles() {
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
}

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

export async function POST(request) {
  try {
    const data = await request.json();

    const {
      image,
      title,
      category,
      excerpt,
      imagexl,
      text,
      image2xl,
      text2,
      publishedAt,
    } = data;

    if (!title || !category || !excerpt || !publishedAt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generar el slug a partir del título
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

    const article = {
      slug, // Se añade el slug generado
      image: image || '',
      title,
      category,
      excerpt,
      imagexl: imagexl || '',
      text: text || '',
      image2xl: image2xl || '',
      text2: text2 || '',
      publishedAt: new Date(publishedAt), // Convertir el string a Date
    };

    await client.connect();
    const db = client.db('verdesabor');
    const result = await db.collection('articles').insertOne(article);
    await client.close();

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: 'Error creating article' },
      { status: 500 }
    );
  }
}
