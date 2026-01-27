
"use client";

import { Leaf, Globe, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { useLanguage } from "../context/LanguageContext"

import { t } from "../i18n/index"

export function AboutSection() {
  const { lang } = useLanguage();
  const aboutText = t(lang).about;
  const features = [
    { icon: Leaf, ...aboutText.features[0] },
    { icon: Globe, ...aboutText.features[1] },
    { icon: Users, ...aboutText.features[2] },
  ];
  const stats = aboutText.stats;

  return (
  <section
    id="quienes-somos"
    className="relative py-20"
    style={{ fontFamily: 'var(--font-roboto)' }}
  >
    {/* Fondo de partículas animadas */}
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <ParticlesBackground />
    </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-primary-1))] mb-4" style={{fontFamily: 'var(--font-barlow)'}}>{aboutText.title}</h2>
          <div className="w-24 h-1 bg-[rgb(var(--color-primary-1))] mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto text-pretty" style={{fontFamily: 'var(--font-montserrat)', color: 'rgb(var(--color-secondary-1))'}}>
            {aboutText.intro.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-md eco-card" style={{fontFamily: 'var(--font-roboto)'}}>
              <CardContent className="p-8 text-center">
                <div className="bg-opacity-10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'rgb(93,116,98,0.08)'}}>
                  <feature.icon className="w-10 h-10" style={{color: 'rgb(93,116,98)'}} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{fontFamily: 'var(--font-barlow)', color: 'rgb(var(--color-primary-2))'}}>{feature.title}</h3>
                <p className="text-gray-600 text-pretty" style={{fontFamily: 'var(--font-montserrat)'}}>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white shadow-lg" style={{fontFamily: 'var(--font-roboto)'}}>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-[rgb(var(--color-primary-1))] mb-4" style={{fontFamily: 'var(--font-barlow)'}}>{aboutText.visionTitle}</h3>
            <p className="text-gray-600 mb-6 text-pretty" style={{fontFamily: 'var(--font-montserrat)'}}>
              {aboutText.vision1}
            </p>
            <p className="text-gray-600 text-pretty" style={{fontFamily: 'var(--font-montserrat)'}}>
              {aboutText.vision2}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
