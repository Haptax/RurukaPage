"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../context/LanguageContext"
import { t } from "../i18n/index"

export function HeroSection() {
  const { lang } = useLanguage();
  const heroImg = lang === 'es'
    ? "/logosRuruka/ruruka_logo_esp_003_alfa.png"
    : "/logosRuruka/ruruka_logo_003 (1).png";
  const heroText = t(lang).hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-4">
      <div
        className="absolute inset-0 z-0 hero-background"
        style={{
          backgroundImage: "url('./logosRuruka/ruruka_fondo.jpg')",
        }}
      />
      <div className="container mx-auto px-4 z-10 flex flex-col justify-center min-h-screen">
  <div className="flex flex-col-reverse md:flex-row items-center justify-center flex-1 gap-0 md:gap-0 py-8">
          {/* Columna de texto */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-4 md:px-0">
            <h1
              className="font-extrabold text-white leading-tight mb-2 md:mb-4 w-full text-center md:text-left"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontSize: 'clamp(1.7rem,7vw,3.5rem)',
                lineHeight: '1.1',
                wordBreak: 'break-word',
              }}
            >
              {heroText.title}
            </h1>
            <p
              className="text-gray-100 mb-2 md:mb-4 max-w-xs sm:max-w-md md:max-w-xl w-full text-center md:text-left"
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(1rem,3.5vw,1.25rem)',
              }}
            >
              {heroText.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start items-center md:items-start">
              <Button
                asChild
                className="px-8 py-4 bg-white text-[rgb(var(--color-primary-1))] font-extrabold rounded-full transition duration-300 hover:scale-105 hover:shadow-lg text-base"
                style={{fontFamily: 'var(--font-barlow)'}}
              >
                <a href="#que-hacemos">{heroText.btnDiscover}</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="px-8 py-4 border-2 border-white text-white font-extrabold rounded-full transition duration-300 hover:bg-white hover:text-[rgb(var(--color-primary-1))] hover:scale-105 bg-transparent text-base"
                style={{fontFamily: 'var(--font-barlow)'}}
              >
                <a href="#contacto">{heroText.btnJoin}</a>
              </Button>
            </div>
          </div>
          {/* Columna de imagen */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative mb-2 md:mb-0">
            <div className="relative z-10 animate-float">
              <Image
                src={heroImg}
                alt="Ruruka"
                width={1600}
                height={1600}
                className="mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
