import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const getArticleBySlug = async (slug) => {
  try {
    const client = await clientPromise;
    const db = client.db("verdesabor");
    const collection = db.collection("articles");

    const article = await collection.findOne({ slug });

    if (!article) {
      console.warn("Artículo no encontrado:", slug);
      return null;
    }

    return article;
  } catch (error) {
    console.error("❌ Error al obtener el artículo:", error);
    throw error;
  }
};

export async function GET(req, { params }) {
  try {
    const { slug } = params; // ✅ No necesitas await en params

    const article = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({ message: "Artículo no encontrado" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener el artículo", error: error.message },
      { status: 500 }
    );
  }
}
