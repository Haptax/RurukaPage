"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../i18n";
import { cn } from "@/lib/utils";

type Kind = "article" | "video" | "list" | "award";
interface PressItem {
  id: string;
  medium: string;
  mediumLogo?: string;
  title: string;
  url: string;
  image?: string;
  kind: Kind;
  date?: string;
  summary?: string;
}

// Datos estáticos (solo campos no traducibles)
const PRESS_DATA: Omit<PressItem, "title">[] = [
  {
    id: "forbes-innovators-35",
    medium: "Forbes",
    mediumLogo: "/logos/forbes.webp",
    url: "https://www.forbes.com.py/innovacion/paraguayas-35-innovadores-mas-destacados-america-latina-mit-technology-review-n80410",
    image: "https://statics.forbes.com.py/2025/10/crop/68fc200f8d7fd__980x549.webp",
    kind: "article",
    date: "2025-10-15",
  },
  {
    id: "forbes-sludge-startup",
    medium: "Forbes",
    mediumLogo: "/logos/forbes.webp",
    url: "https://www.forbes.com.py/innovacion/startup-base-lodos-crea-materiales-construccion-residuos-industriales-gana-competencias-busca-hacer-mas-sostenibles-empresas-n67510",
    image: "https://statics.forbes.com.py/2025/02/crop/67ae38eda6191__980x549.webp",
    kind: "article",
    date: "2025-02-10",
  },
  {
    id: "ultima-hora-tres-innovadores-latam",
    medium: "Última Hora",
    mediumLogo: "/logos/uh.webp",
    url: "https://www.ultimahora.com/tres-paraguayas-entre-los-mejores-innovadores-jovenes-de-latam",
    image: "https://grupovierci.brightspotcdn.com/dims4/default/8671bc2/2147483647/strip/true/crop/1485x836+54+0/resize/2000x1126!/format/webp/quality/90/?url=https%3A%2F%2Fk2-prod-grupo-vierci.s3.us-east-1.amazonaws.com%2Fbrightspot%2F45%2F84%2F830ded524a5926a70ca8eedda214%2F33161500.jpg",
    kind: "article",
    date: "2025-10-14",
  },
  {
    id: "ultima-hora-startup-lodo",
    medium: "Última Hora",
    mediumLogo: "/logos/uh.webp",
    url: "https://www.ultimahora.com/paraguaya-crea-startup-reutilizando-lodo-y-destaca-en-concurso-mundial",
    image: "https://grupovierci.brightspotcdn.com/dims4/default/1c01564/2147483647/strip/true/crop/777x437+0+272/resize/2000x1126!/format/webp/quality/90/?url=https%3A%2F%2Fk2-prod-grupo-vierci.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fe5%2Fcf%2F1a7b58fd2c8323b2d9fa0e506a6d%2F30109326.jpg",
    kind: "article",
    date: "2025-02-18",
  },
  {
    id: "foco-mapa-global",
    medium: "Foco · La Nación",
    mediumLogo: "/logos/foco.webp",
    url: "https://foco.lanacion.com.py/innovacion-foco/2025/11/05/paraguay-en-el-mapa-de-la-innovacion-global/",
    image: "https://www.lanacion.com.py/resizer/v2/6TY2LAE26BABHPMET2Z7DFSLAA.jpeg?auth=840354eb93fa2b179a016e36019789c1f8f50a1619a78c54a877da9dbca92853&width=591&smart=true",
    kind: "article",
    date: "2025-11-05",
  },
  {
    id: "foco-startup-revoluciona",
    medium: "Foco · La Nación",
    mediumLogo: "/logos/foco.webp",
    url: "https://foco.lanacion.com.py/2025/02/17/startup-paraguaya-revoluciona-mercado-de-la-construccion/",
    image: "https://www.lanacion.com.py/resizer/v2/ONG6KVFQ4BFMPPV6ENUSWNNMLM.jpeg?auth=e3db26838c07be410f5cb9e6b9b97d9182484fef980693f19fe6898ec84a34cc&width=1000&smart=true",
    kind: "article",
    date: "2024-04-23",
  },
  {
    id: "elclick-pionera",
    medium: "El Click",
    mediumLogo: "/logos/logoelclick.png",
    url: "https://www.elclick.com.py/post/5003/carmen-paredes-reconocida-pionera",
    image: "https://www.elclick.com.py/img/creativos/carmen-large.jpg",
    kind: "award",
    date: "2025-10-13",
  },
  {
    id: "news-express-tres",
    medium: "News Express",
    mediumLogo: "/logos/NewsExpress.png",
    url: "https://www.newsexpress.com.py/paraguayos/tres-paraguayas-entre-los-jovenes-innovadores-mas-destacados-de-latinoamerica/",
    image: "https://www.newsexpress.com.py/wp-content/uploads/2025/10/IMG_8315-760x490.jpeg",
    kind: "article",
    date: "2025-10-14",
  },
  {
    id: "abc-negocios-entrevista",
    medium: "ABC Negocios",
    mediumLogo: "/logos/ABC-negocios.webp",
    url: "https://www.abc.com.py/tv/video/XcjHNJmv/",
    image: "https://www.abc.com.py/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FXcjHNJmv%2Fposter.jpg%3Fwidth%3D720?auth=9693c673d737453ceda3710c4681f81540b1d9c7f7664c03e1e972fbd71fe199&width=1140&height=663&smart=true",
    kind: "video",
    date: "2025-10-16",
  },
  {
    id: "5dias-entrevista",
    medium: "5Días",
    mediumLogo: "/logos/5dias.webp",
    url: "https://youtu.be/a07lMnmC70Y",
    image: "https://i.ytimg.com/vi/a07lMnmC70Y/maxresdefault.jpg",
    kind: "video",
    date: "2024-11-15",
  },
  {
    id: "5dias-mit-innovacion",
    medium: "5Días",
    mediumLogo: "/logos/5dias.webp",
    url: "https://www.youtube.com/watch?v=Z8a_MyzeRuk",
    image: "https://i.ytimg.com/vi/Z8a_MyzeRuk/maxresdefault.jpg",
    kind: "video",
    date: "2025-10-17",
  },
  {
    id: "elnacional-innovaccion",
    medium: "El Nacional",
    mediumLogo: "/logos/nacional.webp",
    url: "https://elnacional.com.py/economia/innovadora-startup-paraguaya-finalista-concurso-el-reto-innovaccion-20-n71546",
    image: "https://statics.elnacional.com.py/2024/08/crop/3a956f1a178185ee8ba2bdcedd38c284__990x520.webp",
    kind: "article",
    date: "2024-06-18",
  },
  {
    id: "elprisma-mundial",
    medium: "El Prisma",
    mediumLogo: "/logos/prisma.webp",
    url: "https://elprisma.com.py/paraguaya-entre-las-mejores-del-mundo-reciclando-barro-da-empleo-a-alfareros-y-usa-impresoras-3d/",
    image: "https://elprisma.com.py/wp-content/uploads/2024/11/1CARMEN.jpg",
    kind: "article",
    date: "2024-11-26",
  },
  {
    id: "esan-listado",
    medium: "ESAN",
    mediumLogo: "/logos/esan.webp",
    url: "https://www.esan.edu.pe/conexion-esan/esan-reafirma-su-compromiso-con-la-innovacion-conoce-a-los-ganadores-de-los-premios-innovators-under-35-latam",
    image: "https://www.esan.edu.pe/images/blog/20251015/zL9wF9.png",
    kind: "list",
    date: "2025-10-20",
  },
];

export function PressBar() {
  const { lang } = useLanguage();
  const translations = t(lang);

  // Integrar títulos traducidos
  const PRESS_ITEMS: PressItem[] = useMemo(() => {
    return PRESS_DATA.map((item) => {
      const translated = translations.pressBar.items.find((x: any) => x.id === item.id);
      return { ...item, title: translated?.title || item.id };
    });
  }, [lang, translations.pressBar.items]);

  // Agrupar por medio
  const mediumData = useMemo(() => {
    const map: Record<string, { logo?: string; items: PressItem[] }> = {};
    PRESS_ITEMS.forEach((p) => {
      map[p.medium] ||= { logo: p.mediumLogo, items: [] };
      map[p.medium].items.push(p);
    });
    Object.values(map).forEach((m) =>
      m.items.sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    );
    return map;
  }, [PRESS_ITEMS]);

  const mediumNames = useMemo(() => Object.keys(mediumData), [mediumData]);
  const [activeMedium, setActiveMedium] = useState<string | null>(null);

  useEffect(() => {
    if (!activeMedium && mediumNames.length) setActiveMedium(mediumNames[0]);
  }, [activeMedium, mediumNames]);

  const activeItems = activeMedium ? mediumData[activeMedium]?.items || [] : [];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center">
          <h3 className="text-3xl font-bold text-gray-800">
            {translations.pressBar.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {translations.pressBar.subtitle}
          </p>
        </header>

        {/* Tabs / carrusel logos */}
        <div className="mb-10">
          <div
            role="tablist"
            aria-label={translations.pressBar.title}
            className="flex gap-3 overflow-x-auto pb-3 px-1 snap-x snap-mandatory scrollbar-hide justify-start sm:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mediumNames.map((name) => {
              const active = name === activeMedium;
              const { logo } = mediumData[name];
              return (
                <button
                  key={name}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${name}`}
                  aria-label={name}
                  onClick={() => setActiveMedium(name)}
                  className={cn(
                    "group snap-center inline-flex items-center justify-center rounded-full border bg-white px-4 py-2 shadow-sm transition-all cursor-pointer",
                    "min-w-[88px] sm:min-w-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(93,116,98)]",
                    active
                      ? "border-[rgb(93,116,98)] text-[rgb(93,116,98)] shadow-md"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow"
                  )}
                >
                  {logo ? (
                    <Image
                      src={logo}
                      alt={name}
                      width={32}
                      height={32}
                      className="h-8 w-8 sm:h-6 sm:w-6 object-contain transition-all duration-300"
                      style={{
                        filter: active ? "none" : "grayscale(1) brightness(0.95) contrast(0.9)",
                      }}
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">
                      {name[0]}
                    </span>
                  )}
                  <span
                    className="hidden sm:block ml-2 pr-1 text-sm font-medium truncate max-w-[160px]"
                    title={name}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel de artículos */}
        <div
          id={`panel-${activeMedium}`}
          role="tabpanel"
          aria-labelledby={activeMedium || undefined}
          className="flex justify-center"
        >
          {activeItems.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              {translations.pressBar.noItems}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
              {activeItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition cursor-pointer",
                    "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(93,116,98)]"
                  )}
                >
                  {item.image ? (
                    <div className="relative mb-3 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={200}
                        loading="lazy"
                        unoptimized
                        className="h-40 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10" />
                    </div>
                  ) : (
                    <div className="mb-3 flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
                      {translations.pressBar.noImage}
                    </div>
                  )}
                  <h4 className="mb-2 line-clamp-3 text-sm font-semibold leading-snug text-gray-800 group-hover:text-[rgb(93,116,98)]">
                    {item.title}
                  </h4>
                  <div className="mt-auto flex items-end justify-between gap-2">
                    {item.summary && (
                      <p className="line-clamp-2 text-[11px] text-gray-600">
                        {item.summary}
                      </p>
                    )}
                    <span className="shrink-0 text-[10px] font-medium text-gray-400">
                      {new URL(item.url).hostname.replace(/^www\./, "")}
                    </span>
                  </div>
                  {item.kind !== "article" && (
                    <span
                      className={cn(
                        "absolute right-3 top-3 rounded-full border px-2 py-[2px] text-[10px] font-semibold backdrop-blur-sm",
                        item.kind === "video"
                          ? "bg-red-50 text-red-600 border-red-200"
                          : item.kind === "award"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : item.kind === "list"
                          ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      )}
                    >
                      {translations.pressBar.kinds[item.kind]}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
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
