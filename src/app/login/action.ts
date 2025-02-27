"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(username: string, password: string) {
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    (await cookies()).set("admin-auth", "true", { 
      httpOnly: true, 
      secure: true, 
      sameSite: "strict", 
      path: "/", 
      maxAge: 60 * 60 * 24 
    });
    redirect("/adminpage"); 
  } else {
    throw new Error("Credenciales incorrectas");
  }
}
