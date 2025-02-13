"use client";

import { Facebook, Instagram, Twitter, Heart, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-green-50">
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
              <span className="w-8 h-0.5 bg-gray-800"></span>
              Categories
            </h3>
            <ul className="space-y-3">
              {["Nutrition", "Exercise", "Mental Wellness", "Healthy Recipes"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gray-800 transition-all duration-200"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gray-800"></span>
              Useful Links
            </h3>
            <ul className="space-y-3">
              {["About Us", "Contact", "Privacy Policy", "Terms of Use"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gray-800 transition-all duration-200"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gray-800"></span>
              Follow Us
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
                  className="p-2 rounded-full transition-colors duration-200 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-600">Join our healthy community</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-emerald-100">
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
