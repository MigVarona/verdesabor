import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Verdesabor
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/articulos" className="text-gray-600 hover:text-gray-800">
              Artículos
            </Link>
            <Link href="/sobre-nosotros" className="text-gray-600 hover:text-gray-800">
              Sobre Nosotros
            </Link>
            <button className="bg-primary px-4 py-2 rounded-md text-primary-foreground hover:opacity-90 transition-opacity">
              Suscribirse
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;