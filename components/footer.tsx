
"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../context/LanguageContext";
import { t } from "../i18n";
export function Footer() {
  const { lang } = useLanguage();
  const translations = t(lang);
  const quickLinks = [
    { href: "#quienes-somos", label: translations.navbar.quienes },
    { href: "#que-hacemos", label: translations.navbar.que },
    { href: "#blog", label: translations.navbar.blog },
    { href: "#contacto", label: translations.navbar.contacto },
  ];

  const resources = [
    { href: "#", label: lang === "es" ? "Blog" : "Blog" },
    { href: "#", label: lang === "es" ? "Casos de éxito" : "Success stories" },
    { href: "#", label: lang === "es" ? "Documentación" : "Documentation" },
    { href: "#", label: lang === "es" ? "Preguntas frecuentes" : "FAQ" },
  ];

  const legal = [
    { href: "#", label: translations.footer.terms },
    { href: "#", label: translations.footer.privacy },
    { href: "#", label: lang === "es" ? "Aviso legal" : "Legal notice" },
  ];

  return (
    <footer className="bg-[rgb(var(--color-primary-1))] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logosRuruka/ruruka_logo_003 (1).png"
              alt="Ruruka Logo"
              width={140}
              height={140}
              className="h-44 w-auto mb-4"
            />
            
          </div>


          <div>
            <h4 className="font-bold text-lg mb-4">{lang === "es" ? "Enlaces rápidos" : "Quick Links"}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="hover:text-[rgb(var(--color-secondary-1))] transition duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{lang === "es" ? "Recursos" : "Resources"}</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="hover:text-[rgb(var(--color-secondary-1))] transition duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Se eliminó la sección Newsletter */}
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 mb-4 md:mb-0">© 2025 Ruruka. {translations.footer.rights}</p>
          <div className="flex space-x-6">
            {legal.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm opacity-80 hover:text-[rgb(var(--color-secondary-2))] hover:opacity-100 transition duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>

  )
}

