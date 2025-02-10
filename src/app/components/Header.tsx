import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
          Renew
          </Link>
         
        </nav>
      </div>
    </header>
  );
};

export default Header;