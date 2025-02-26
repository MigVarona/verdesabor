"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      document.cookie = `admin_secret=${password}; path=/; max-age=86400; Secure`;

      setTimeout(() => {
        router.replace("/adminpage"); // ✅ Redirige tras un pequeño retraso
      }, 100);
    } else {
      setError("❌ Clave incorrecta");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl mb-4">🔐 Acceso Admin</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Clave de admin"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Entrar
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
