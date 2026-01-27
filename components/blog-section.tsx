"use client"


import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, AlertCircle } from "lucide-react"
import { useLanguage } from "../context/LanguageContext";
import { t } from "../i18n";



export function BlogSection() {
  const { lang } = useLanguage();
  const translations = t(lang);
  const posts = [
    {
      title: lang === "es" ? "¿Qué es el Lodo Residual?" : "What is Residual Sludge?",
      date: lang === "es" ? "29 de agosto, 2025" : "August 29, 2025",
      excerpt:
        lang === "es"
          ? "Descubre qué son los lodos residuales, cómo se generan y por qué su gestión sostenible es clave para el medio ambiente y la economía circular."
          : "Discover what residual sludge is, how it is generated, and why its sustainable management is key for the environment and the circular economy.",
      content: (
        <div className="text-center px-2 md:px-8">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center rounded-full bg-[#fbeee7] w-16 h-16">
              <AlertCircle className="w-10 h-10 text-[#b07a5b]" />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{color: '#5B4033', fontFamily: 'var(--font-barlow)'}}>
            {lang === "es" ? "¿Qué es el Lodo Residual?" : "What is Residual Sludge?"}
          </h2>
          <h3 className="text-xl mb-6" style={{color: '#b07a5b', fontFamily: 'var(--font-montserrat)'}}>
            {lang === "es"
              ? "Un problema ambiental que se convierte en oportunidad"
              : "An environmental problem that becomes an opportunity"}
          </h3>
          <p className="text-lg text-gray-700" style={{fontFamily: 'var(--font-montserrat)'}}>
            {lang === "es"
              ? "Los lodos residuales son subproductos sólidos generados durante el tratamiento de aguas industriales. Contienen materia orgánica, metales pesados y otros contaminantes que, sin el tratamiento adecuado, representan un serio riesgo ambiental."
              : "Residual sludge is a solid byproduct generated during the treatment of industrial water. It contains organic matter, heavy metals, and other contaminants that, without proper treatment, pose a serious environmental risk."}
          </p>
        </div>
      ),
    },
    // Puedes agregar más posts aquí
  ];

  const [openIdx, setOpenIdx] = useState<number|null>(null);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#5B4033', fontFamily: 'var(--font-barlow)'}}>
            {translations.blogSection.title}
          </h2>
          <div className="w-24 h-1 mx-auto mb-8" style={{backgroundColor: '#5B4033'}}></div>
          <p className="text-xl max-w-3xl mx-auto text-pretty" style={{color: 'rgb(103,127,164)', fontFamily: 'var(--font-montserrat)'}}>
            {lang === "es"
              ? "Noticias, artículos y recursos para entender más sobre la economía circular y la misión de Ruruka."
              : "News, articles, and resources to better understand the circular economy and Ruruka's mission."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <Card key={idx} className="bg-white shadow-lg p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{color: '#5B4033', fontFamily: 'var(--font-barlow)'}}>{post.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <p className="text-gray-700 mb-4" style={{fontFamily: 'var(--font-montserrat)'}}>{post.excerpt}</p>
              </div>
              <button
                onClick={() => setOpenIdx(idx)}
                className="text-[rgb(103,127,164)] font-bold hover:underline mt-2"
                style={{fontFamily: 'var(--font-barlow)'}}
              >
                {translations.blogSection.readMore}
              </button>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {openIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-[#fbeee7] rounded-lg shadow-xl max-w-lg w-full mx-4 p-8 relative animate-fade-in">
              <button
                onClick={() => setOpenIdx(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                aria-label={lang === "es" ? "Cerrar" : "Close"}
              >
                ×
              </button>
              {posts[openIdx].content}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
