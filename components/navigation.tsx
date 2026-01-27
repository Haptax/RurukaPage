"use client"


import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { t } from "../i18n/index";
import { useLanguage } from "../context/LanguageContext";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const nav = t(lang).navbar;
  const navItems = [
    { href: "#quienes-somos", label: nav.quienes },
    { href: "#que-hacemos", label: nav.que },
    { href: "#blog", label: nav.blog },
    { href: "#contacto", label: nav.contacto },
  ];

  return (
    <nav className="bg-[rgb(var(--ruruka-primary))] bg-opacity-95 fixed w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logosRuruka/ruruka_logo_013 (1).png"
              alt="Ruruka Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white hover:text-gray-200 font-roboto font-medium transition duration-300"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="ml-4 px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[rgb(var(--ruruka-primary))] transition duration-300 font-bold"
              aria-label="Cambiar idioma"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white p-2" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[rgb(var(--ruruka-primary))] mt-2 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-gray-200 font-roboto font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="mt-4 px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[rgb(var(--ruruka-primary))] transition duration-300 font-bold"
                aria-label="Cambiar idioma"
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
