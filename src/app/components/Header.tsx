import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-center">
        <Link
  href="/"
  className="h-full text-4xl sm:text-5xl md:text-6xl text-[rgb(34,34,34)] font-bold flex items-center font-noto tracking-[0.25em]"
>
  RENEW
</Link>
pr
        </nav>
      </div>
    </header>
  );
};

export default Header;
