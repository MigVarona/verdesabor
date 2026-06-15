import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-renew-dark">404</p>
          <h1 className="mt-4 text-2xl font-bold text-renew-dark">Page not found</h1>
          <p className="mt-3 text-gray-500 leading-relaxed">
            The page you requested doesn&apos;t exist or may have been moved.
          </p>
          <Link
            href="/"
            className="inline-block mt-8 bg-renew-dark text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
