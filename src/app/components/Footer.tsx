"use client"

import { Facebook, Instagram, Twitter, Heart, Leaf, ArrowUpCircle } from "lucide-react"
import Link from "next/link";
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-green-50">
      <div className="absolute right-6 -top-6">
        <button
          onClick={scrollToTop}
          className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="w-6 h-6 text-emerald-600 group-hover:text-emerald-500 transition-colors" />
        </button>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-800">Verdesabor</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Inspirando vidas más saludables, un artículo a la vez. Juntos hacia un mejor bienestar.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-emerald-500"></span>
              Categorías
            </h3>
            <ul className="space-y-3">
              {["Nutrición", "Ejercicio", "Bienestar Mental", "Recetas Saludables"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-200"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-emerald-500"></span>
              Enlaces Útiles
            </h3>
            <ul className="space-y-3">
              {["Sobre Nosotros", "Contacto", "Política de Privacidad", "Términos de Uso"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-200"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-emerald-500"></span>
              Síguenos
            </h3>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" }
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-600">Únete a nuestra comunidad saludable</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-emerald-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
            <p className="text-sm flex items-center gap-2">
              &copy; {new Date().getFullYear()} Verdesabor. 
              <span className="flex items-center gap-1">
                Hecho con <Heart className="w-4 h-4 text-rose-500" /> para tu bienestar
              </span>
            </p>
            <p className="text-sm">Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}