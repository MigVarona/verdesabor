"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  (await cookies()).set("admin-auth", "", { expires: new Date(0) }); // Expira la cookie
  redirect("/login"); 
}
