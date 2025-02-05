import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-20 text-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Vida Saludable</h2>
            <p className="text-sm">Inspirando vidas más saludables, un artículo a la vez.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Nutrición
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Ejercicio
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Bienestar Mental
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Recetas Saludables
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-700 transition-colors">
                  Términos de Uso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-green-700 transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-green-700 transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-green-700 transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-green-200 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Vida Saludable. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

