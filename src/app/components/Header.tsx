"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { href: "/nutrition", label: "Nutrition" },
    { href: "/biohacking", label: "Biohacking" },
    { href: "/fitness", label: "Fitness" },
    { href: "/wellness", label: "Wellness" },
    { href: "/lifestyle", label: "Lifestyle" },
    { href: "/supplements", label: "Supplements" },
  ]

  return (
    <header className="py-6 md:py-10 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6 md:mb-8">
            {isClient && isMobile && (
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold font-noto tracking-[0.15em]"
              >
                RENEW
              </Link>
            </div>

            {isClient && isMobile && <div className="w-6" />}
          </div>

          {isClient && !isMobile && (
            <nav className="w-full">
              <ul className="flex justify-center space-x-6 lg:space-x-12 text-base font-duplet text-gray-700">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-black transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {isClient && isMobile && (
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <div className="w-6" />
              <Link
                href="/"
                className="text-3xl text-gray-900 font-bold font-noto tracking-[0.15em]"
                onClick={() => setIsMenuOpen(false)}
              >
                RENEW
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav>
              <ul className="space-y-6 text-lg font-duplet text-gray-700">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block hover:text-black transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 mt-6 md:mt-8">
        <hr className="border-t border-gray-300 mx-auto" style={{ width: "90%" }} />
      </div>

    </header>
  )
}

export default Header
