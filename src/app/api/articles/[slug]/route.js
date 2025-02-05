import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getArticleBySlug = async (slug) => {
  try {
    await client.connect();
    const db = client.db("verdesabor");
    const collection = db.collection("articles");
    const article = await collection.findOne({ slug });

    if (!article) {
      console.log('Artículo no encontrado');
      return null;
    }
    
    return article;
  } catch (error) {
    console.error("Error al obtener el artículo:", error);
    throw error;
  } finally {
    await client.close();
  }
};

// Manejar la solicitud GET
export async function GET(req, props) {
  const params = await props.params;
  const { slug } = params;

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      console.log("No se encontró el artículo con el slug:", slug);
      return new Response(
        JSON.stringify({ message: "Artículo no encontrado" }),
        { status: 404 }
      );
    }

    console.log("Artículo encontrado:", article);
    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener el artículo", error: error.message }),
      { status: 500 }
    );
  }
}
