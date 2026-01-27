"use client"

import { useEffect } from "react"

export function ParticlesBackground() {
  useEffect(() => {

    function createParticle() {
      const particle = document.createElement("div")
      particle.className = "particle"

  // Tamaño más pequeño y sutil
  const size = Math.random() * 2 + 2 // entre 2px y 4px
  particle.style.width = `${size}px`
  particle.style.height = `${size}px`

      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight
      particle.style.left = `${startX}px`
      particle.style.top = `${startY}px`

      const container = document.getElementById("particles-container")
      if (container) {
        container.appendChild(particle)

        const animation = particle.animate(
          [
            { transform: "translate(0, 0)", opacity: 0 },
            { transform: `translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px)`, opacity: 0.4 },
            { transform: "translate(0, 0)", opacity: 0 },
          ],
          {
            duration: Math.random() * 4000 + 4000, // más lento
            iterations: Number.POSITIVE_INFINITY,
          },
        )

        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove()
          }
        }, 5000)
      }
    }

  // Menos partículas por segundo
  const interval = setInterval(createParticle, 160)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div id="particles-container" className="fixed inset-0 z-0 pointer-events-none"></div>
}
