import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
      const { category } = await params; 
  
      const client = await clientPromise;
      const db = client.db("verdesabor");
      const collection = db.collection("articles");
  
      const articles = await collection
  .find({ category: new RegExp(`^${category}$`, "i") }) 
  .toArray();

  
      if (articles.length === 0) {
        return new Response(
          JSON.stringify({ message: "No se encontraron artículos en esta categoría" }),
          { status: 404 }
        );
      }
  
      return new Response(JSON.stringify(articles), { status: 200 });
    } catch (error) {
      console.error("Error al obtener los artículos por categoría:", error);
      return new Response(
        JSON.stringify({ message: "Error en el servidor", error: error.message }),
        { status: 500 }
      );
    }
  }
  