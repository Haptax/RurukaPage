
"use client";
import type React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Layers, Truck, Leaf, Cloud, Thermometer, Package } from "lucide-react"
import { useLanguage } from "../context/LanguageContext";
import { t } from "../i18n";

export function ProcessSection() {
  const { lang } = useLanguage();
  const translations = t(lang);

  // Usar los pasos de la traducción
  const steps = translations.processSection.steps.map((step: any, idx: number) => ({
    ...step,
    number: idx + 1,
    images: [
      `/procesos/recol1.webp`,
      `/procesos/recol2.webp`,
      `/procesos/reval1.webp`,
      `/procesos/reval2.webp`,
      `/procesos/distri1.webp`,
      `/procesos/distri2.webp`,
    ].slice(idx * 2, idx * 2 + 2)
  }));

  // Puedes agregar beneficios e impacto ambiental a la traducción si lo deseas
  const benefits = [
    lang === "es"
      ? "Reducción significativa de residuos enviados a vertederos"
      : "Significant reduction of waste sent to landfills",
    lang === "es"
      ? "Disminución de la extracción de materias primas vírgenes"
      : "Reduction in extraction of virgin raw materials",
    lang === "es"
      ? "Apoyo a comunidades de artesanos y alfareros tradicionales"
      : "Support for artisan and traditional potter communities",
    lang === "es"
      ? "Reducción de costos para empresas productoras de lodos"
      : "Cost reduction for sludge-producing companies",
    lang === "es"
      ? "Creación de nuevos empleos verdes y oportunidades de negocio"
      : "Creation of new green jobs and business opportunities",
  ];

  const impactMetrics = [
    {
      icon: Layers,
      value: "+18.000 toneladas",
      label: lang === "es" ? "Toneladas de lodos revalorizados" : "Tons of sludge revalued",
    },
    {
      icon: Leaf,
      value: "+80.000 kg",
      label: lang === "es" ? "CO₂ evitado estimado" : "Estimated CO₂ avoided",
    },
    {
      icon: Thermometer,
      value: "+25.000 kg",
      label: lang === "es" ? "Metano evitado estimado" : "Estimated methane avoided",
    },
    {
      icon: Package,
      value: "+120.000 unidades",
      label: lang === "es" ? "Materiales fabricados" : "Materials manufactured",
    },
  ];

  return (
    <section
      id="que-hacemos"
            className="py-20"
            style={{
              background: 'linear-gradient(120deg, #6CA0DC 0%, #B07A5B 40%, #E94F37 100%)',
              fontFamily: 'var(--font-roboto)'
            }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#5B4033', fontFamily: 'var(--font-barlow)'}}>
                  {translations.processSection.title}
                </h2>
                <div className="w-24 h-1 mx-auto mb-8" style={{backgroundColor: '#5B4033'}}></div>
                <p className="text-xl max-w-3xl mx-auto text-pretty" style={{color: 'white', fontFamily: 'var(--font-montserrat)'}}>
                  {lang === "es"
                    ? "Convertimos lodos residuales industriales en materiales de construcción sostenibles y medimos el impacto positivo de cada tonelada revalorizada.\nCreamos una cadena de valor win-win-win donde empresas, productores y planeta salen ganando."
                    : "We turn industrial residual sludge into sustainable building materials and measure the positive impact of each ton revalued.\nWe create a win-win-win value chain where companies, producers, and the planet all benefit."}
                </p>
              </div>

              <div className="relative mb-20">
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[rgb(var(--ruruka-primary))] bg-opacity-30 transform -translate-y-1/2 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  {steps.map((step, index) => (
                    <Card key={index} className={`bg-white shadow-lg eco-card ${index === 1 ? "md:mt-12" : ""}`}>
                      <CardContent className="p-8">
                        <div className="text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto -mt-16 shadow-lg mb-6" style={{backgroundColor: 'rgb(103,127,164)'}}>
                          <span className="text-2xl font-bold">{step.number}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center text-balance" style={{color: '#5B4033', fontFamily: 'var(--font-barlow)'}}>
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-6 text-pretty" style={{fontFamily: 'var(--font-montserrat)'}}>{step.description}</p>
                        <div className="flex justify-center gap-4">
                          {step.images.map((img: string, i: number) => (
                            <Image
                              key={i}
                              src={img}
                              alt={step.title + ' ' + (i+1)}
                              width={240}
                              height={140}
                              quality={80}
                              className="rounded-lg h-36 object-cover w-1/2"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-white shadow-lg overflow-hidden" style={{fontFamily: 'var(--font-roboto)'}}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 bg-[rgb(var(--color-primary-1))] p-8 text-white">
                    <h3 className="text-2xl font-bold mb-6" style={{fontFamily: 'var(--font-barlow)'}}>
                      {lang === "es" ? "Beneficios de Nuestra Solución" : "Benefits of Our Solution"}
                    </h3>
                    <ul className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-6 h-6 mr-2 flex-shrink-0" />
                          <span className="text-pretty" style={{fontFamily: 'var(--font-montserrat)'}}>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-[rgb(var(--color-primary-1))] mb-6" style={{fontFamily: 'var(--font-barlow)'}}>
                      {lang === "es" ? "Impacto Ambiental" : "Environmental Impact"}
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {impactMetrics.map((metric, index) => (
                        <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-sm h-full">
                          <metric.icon className="w-10 h-10 mb-2 text-[rgb(103,127,164)]" />
                          <span className="text-xl font-bold mb-1" style={{fontFamily: 'var(--font-barlow)', color: '#5B4033'}}>{metric.value}</span>
                          <span className="text-center text-gray-700 text-sm" style={{fontFamily: 'var(--font-montserrat)'}}>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        );
      }
