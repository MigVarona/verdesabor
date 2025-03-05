"use client";

import { Instagram, Twitter, Heart, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      <div className="absolute right-6 -top-6">
        <button
          onClick={scrollToTop}
          className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="w-6 h-6 text-gray-80 transition-colors" />
        </button>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl tracking-[0.25em] font-bold font-noto text-gray-800">
                RENEW
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Inspiring healthier lives, one article at a time. Together towards better well-being.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="flex items-center space-x-2"> 
                <span className="w-8 h-0.5 bg-gray-800"></span>
                <span className="text-gray-800">Categories</span> 
              </div>
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Nutrition", path: "/nutrition" },
                { name: "Biohacking", path: "/biohacking" },
                { name: "Neuroscience", path: "/neuroscience" },
                { name: "Wellness", path: "/wellness" },
                { name: "Lifestyle", path: "/lifestyle" },
                { name: "Longevity", path: "/longevity" }
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link
                    href={path}
                    className="text-gray-600  transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gray-800 transition-all duration-200"></span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gray-800"></span>
              Useful Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact", href: "#" },
                { name: "Privacy Policy", href: "/privacy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gray-800 transition-all duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gray-800"></span>
              Follow Us
            </h3>
            <div className="flex gap-4">

              <Link
                href="https://www.instagram.com/renew.habits/"
                className="p-2 rounded-full transition-colors duration-200 group"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-gray" />
              </Link>
              <Link
                href="https://x.com/renew_habits"
                className="p-2 rounded-full transition-colors duration-200 group"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 text-gray" />
              </Link>
            </div>
            <p className="text-sm text-gray-600">Join our healthy community</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
            <p className="text-sm flex items-center gap-2">
              &copy; {new Date().getFullYear()} RENEW.
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-rose-500" /> for your well-being
              </span>
            </p>
            <p className="text-sm">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
