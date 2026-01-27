# Ruruka Homepage

Este proyecto es la landing page de Ruruka, una startup de economía circular enfocada en la transformación de lodos residuales en oportunidades sostenibles.

## Deployment

El sitio está configurado para deployarse automáticamente a S3 con GitHub Actions. Se incluye un script `fix-paths.js` que convierte rutas absolutas a relativas para compatibilidad con hosting estático en S3.

## Tecnologías principales

- Next.js + React + TypeScript
- Tailwind CSS
- Componentes modulares y reutilizables
- Fuentes personalizadas (Roboto, Geist)
- Integración con Radix UI y Lucide

## Scripts útiles

- `pnpm dev` — Inicia el servidor de desarrollo
- `pnpm build` — Compila la aplicación para producción
- `pnpm start` — Inicia la app en modo producción
- `pnpm lint` — Linting del código

## Estructura

- `/app` — Páginas y layout principal
- `/components` — Componentes reutilizables (secciones, navegación, footer, etc.)
- `/styles` — Estilos globales y utilidades

## Cómo iniciar

1. Instala dependencias: `pnpm install`
2. Corre el servidor: `pnpm dev`
3. Abre en tu navegador: [http://localhost:3000](http://localhost:3000)