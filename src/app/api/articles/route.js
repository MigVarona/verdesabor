import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

async function getArticles() {
  try {
    const client = await clientPromise;
    const db = client.db("verdesabor");
    const collection = db.collection("articles");

    return await collection.find().sort({ publishedAt: -1 }).toArray();
  } catch (error) {
    console.error("❌ Error al obtener los artículos:", error);
    throw error;
  }
}

function authenticateRequest(request) {
  const apiKey = request.headers.get('x-api-key');

  console.log("🔍 API Key enviada:", apiKey);
  console.log("🔍 API Key esperada:", process.env.API_KEY); 

  if (!apiKey || apiKey !== process.env.API_KEY) {  
    return { error: 'API Key inválida', status: 401 };
  }

  return { success: true };
}


export async function GET(request) {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener los artículos", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const auth = authenticateRequest(request);
  if (auth.error) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const data = await request.json();
    const { image, title, category, excerpt, imagexl, text, image2xl, text2, publishedAt } = data;

    if (!title || !category || !excerpt || !publishedAt) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    const article = {
      slug,
      image: image || '',
      title,
      category,
      excerpt,
      imagexl: imagexl || '',
      text: text || '',
      image2xl: image2xl || '',
      text2: text2 || '',
      publishedAt: new Date(publishedAt),
    };

    const client = await clientPromise;
    const db = client.db('verdesabor');
    const result = await db.collection('articles').insertOne(article);

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('❌ Error al crear el artículo:', error);
    return NextResponse.json({ success: false, error: 'Error creando el artículo' }, { status: 500 });
  }
}
