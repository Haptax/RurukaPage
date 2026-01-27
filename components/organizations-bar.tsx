"use client";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../i18n";

const orgLinks = [
  {
    name: "MIT Innovators Under 35 LATAM",
    url: "https://technologyreview.es/article/carmen-paredes-paraguay-29/",
    logo: "/logos/MITInnovator.png"
  },
  {
    name: "Exponeur",
    url: "https://www.genglobal.org/gen-founders/news/three-entrepreneurs-selected-pitch-expo-2025-osaka-exponeur-academy",
    logo: "/logos/Exponeur.png"
  },
  {
    name: "TIC Americas",
    url: "https://ticamericas.net/finales/finalistas-2024/ruruka/",
    logo: "/logos/ticamerica.webp"
  },
  {
    name: "BID-FEMSA",
    url: "https://blogs.iadb.org/agua/es/resignificar-los-desechos-para-verlos-como-oportunidades/",
    logo: "/logos/bid-femsa.webp"
  },
  {
    name: "Entrepreneurship World Cup",
    url: "https://www.genglobal.org/paraguay/news/pride-paraguay-carmen-paredes-and-claudia-requejo-among-top-100-world",
    logo: "/logos/worldcup.webp"
  },
  {
    name: "YounWater",
    url: "https://youngwatersolutions.org/es/join-our-community/",
    logo: "/logos/younwater.webp"
  },
];

export function OrganizationsBar() {
  const { lang } = useLanguage();
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg font-bold mb-8 text-gray-700">
          {t(lang).organizationsSection.powered}
        </h3>
        
        {/* Carrusel de logos con scroll horizontal */}
        <div className="relative">
          <div
            className="flex overflow-x-auto gap-8 pb-4 px-2 snap-x snap-mandatory scrollbar-hide justify-start sm:justify-center"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              minHeight: 120
            }}
          >
            {orgLinks.map((org, idx) => (
              <a
                key={idx}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 snap-center flex justify-center items-center group transition-transform hover:scale-105"
                style={{ minWidth: 160, maxWidth: 220 }}
              >
                <Image
                  src={org.logo}
                  alt={org.name}
                  width={200}
                  height={100}
                  className="object-contain h-20 w-auto drop-shadow-md bg-white p-2 rounded transition-all duration-300"
                  style={{
                    filter: 'grayscale(0.3) brightness(1.05) contrast(1.05)'
                  }}
                />
              </a>
            ))}
          </div>
          
          {/* Gradientes de fade en los bordes */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
