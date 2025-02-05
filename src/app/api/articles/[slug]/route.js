// app/api/articles/[slug]/route.js
import { MongoClient } from 'mongodb';

// Conexión con MongoDB
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const getArticleBySlug = async (slug) => {
  try {
    await client.connect();
    const db = client.db("verdesabor");  // Nombre de tu base de datos
    const collection = db.collection("articles");  // Nombre de la colección que contiene los artículos
    const article = await collection.findOne({ slug });
    return article;
  } catch (error) {
    console.error("Error obteniendo artículo:", error);
    throw error;
  } finally {
    await client.close();
  }
};

// Manejar la solicitud GET
export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return new Response(JSON.stringify({ message: "Artículo no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al obtener el artículo", error: error.message }), { status: 500 });
  }
}
