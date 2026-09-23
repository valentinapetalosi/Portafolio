import { useEffect, useState } from "react";
import { Brush, Flower, Heart, InstagramIcon, Star, Sun } from "./Doodles";
import logoValentinaInk from "./assets/logo-valentina-ink.webp";
import portadaBase2 from "./assets/portada2/portada-base.webp";
import starFlower0 from "./assets/portada2/flower_0.webp";
import starFlower1 from "./assets/portada2/flower_1.webp";
import starFlower2 from "./assets/portada2/flower_2.webp";
import starFlower3 from "./assets/portada2/flower_3.webp";
import starFlower4 from "./assets/portada2/flower_4.webp";
import starFlower5 from "./assets/portada2/flower_5.webp";
import starFlower6 from "./assets/portada2/flower_6.webp";
import starSpiky7 from "./assets/portada2/spiky_7.webp";
import starFlower8 from "./assets/portada2/flower_8.webp";
import starFlower9 from "./assets/portada2/flower_9.webp";
import starFlower10 from "./assets/portada2/flower_10.webp";
import starFlower11 from "./assets/portada2/flower_11.webp";
import starFlower12 from "./assets/portada2/flower_12.webp";
import starFlower13 from "./assets/portada2/flower_13.webp";
import starFlower14 from "./assets/portada2/flower_14.webp";
import starStar15 from "./assets/portada2/star_15.webp";
import starStar16 from "./assets/portada2/star_16.webp";
import starStar17 from "./assets/portada2/star_17.webp";
import starStar18 from "./assets/portada2/star_18.webp";
import starStar19 from "./assets/portada2/star_19.webp";
import starStar20 from "./assets/portada2/star_20.webp";
import starStar21 from "./assets/portada2/star_21.webp";
import starStar22 from "./assets/portada2/star_22.webp";
import starStar23 from "./assets/portada2/star_23.webp";
import starStar24 from "./assets/portada2/star_24.webp";
import starStar25 from "./assets/portada2/star_25.webp";
import starStar26 from "./assets/portada2/star_26.webp";
import starStar27 from "./assets/portada2/star_27.webp";
import starStar28 from "./assets/portada2/star_28.webp";
import starStar29 from "./assets/portada2/star_29.webp";
import starStar30 from "./assets/portada2/star_30.webp";
import starStar31 from "./assets/portada2/star_31.webp";
import starStar32 from "./assets/portada2/star_32.webp";
import starStar33 from "./assets/portada2/star_33.webp";
import starPinwheel from "./assets/portada2/pinwheel.webp";
import starBluestar from "./assets/portada2/bluestar.webp";

const STARS2 = [
  { src: starFlower0, left: 26.944, top: 5.606, width: 3.845, duration: "5s", reverse: true },
  { src: starFlower1, left: 32.26, top: 7.836, width: 4.398, duration: "5.5s", reverse: false },
  { src: starFlower2, left: 29.042, top: 13.155, width: 2.855, duration: "6s", reverse: true },
  { src: starFlower3, left: 34.227, top: 15.651, width: 4.486, duration: "6.5s", reverse: false },
  { src: starFlower4, left: 40.402, top: 19.947, width: 4.195, duration: "7s", reverse: true },
  { src: starFlower5, left: 44.626, top: 24.1, width: 4.253, duration: "7.5s", reverse: false },
  { src: starFlower6, left: 49.257, top: 23.322, width: 2.505, duration: "8s", reverse: true },
  { src: starSpiky7, left: 43.912, top: 58.818, width: 6.263, duration: "9s", reverse: false },
  { src: starFlower8, left: 39.907, top: 66.551, width: 4.078, duration: "10s", reverse: true },
  { src: starFlower9, left: 48.311, top: 71.031, width: 2.767, duration: "11s", reverse: false },
  { src: starFlower10, left: 33.673, top: 73.241, width: 6.059, duration: "12s", reverse: true },
  { src: starFlower11, left: 38.538, top: 76.759, width: 2.796, duration: "13s", reverse: false },
  { src: starFlower12, left: 22.575, top: 80.872, width: 5.651, duration: "14s", reverse: true },
  { src: starFlower13, left: 28.954, top: 79.521, width: 2.796, duration: "15s", reverse: false },
  { src: starFlower14, left: 34.066, top: 80.994, width: 4.049, duration: "16s", reverse: true },
  { src: starStar15, left: 61.856, top: 9.349, width: 2.651, duration: "18s", reverse: false },
  { src: starStar16, left: 73.653, top: 11.559, width: 2.709, duration: "5s", reverse: true },
  { src: starStar17, left: 63.705, top: 13.093, width: 1.864, duration: "5.5s", reverse: false },
  { src: starStar18, left: 76.668, top: 14.484, width: 2.214, duration: "6s", reverse: true },
  { src: starStar19, left: 72.473, top: 16.223, width: 3.262, duration: "6.5s", reverse: false },
  { src: starStar20, left: 62.016, top: 16.858, width: 3.437, duration: "7s", reverse: true },
  { src: starStar21, left: 61.069, top: 21.42, width: 2.185, duration: "7.5s", reverse: false },
  { src: starStar22, left: 71.104, top: 23.384, width: 1.631, duration: "8s", reverse: true },
  { src: starStar23, left: 70.944, top: 44.824, width: 2.884, duration: "9s", reverse: false },
  { src: starStar24, left: 62.759, top: 49.959, width: 2.243, duration: "10s", reverse: true },
  { src: starStar25, left: 72.051, top: 53.519, width: 1.66, duration: "11s", reverse: false },
  { src: starStar26, left: 78.27, top: 58.961, width: 3.612, duration: "12s", reverse: true },
  { src: starStar27, left: 60.224, top: 66.182, width: 2.651, duration: "13s", reverse: false },
  { src: starStar28, left: 79.449, top: 66.142, width: 2.126, duration: "14s", reverse: true },
  { src: starStar29, left: 74.425, top: 67.921, width: 2.622, duration: "15s", reverse: false },
  { src: starStar30, left: 75.342, top: 73.22, width: 3.525, duration: "16s", reverse: true },
  { src: starStar31, left: 62.045, top: 76.125, width: 2.913, duration: "18s", reverse: false },
  { src: starStar32, left: 64.506, top: 85.086, width: 2.01, duration: "5s", reverse: true },
  { src: starStar33, left: 66.939, top: 90.548, width: 4.136, duration: "5.5s", reverse: false },
  { src: starPinwheel, left: 19.662, top: 22.709, width: 13.108, duration: "6s", reverse: true },
  { src: starBluestar, left: 16.021, top: 67.512, width: 11.652, duration: "6.5s", reverse: false },
];

import isotipoCream from "./assets/isotipo-cream.webp";
import aarimoLaptop from "./assets/projects/aarimo-cover.webp";
import aarimo1 from "./assets/projects/aarimo-1.webp";
import aarimo2 from "./assets/projects/aarimo-2.webp";
import aarimo3 from "./assets/projects/aarimo-3.webp";
import aarimo4 from "./assets/projects/aarimo-4.webp";

const AARIMO_TEXT = `2025
Proyecto por encargo
Ilustración para página web
—
Creada para AARIMO (Alianza Amazónica para la Reducción de los Impactos de la Minería de Oro), esta ilustración se desarrolló para el sitio web de la organización con el fin de comunicar visualmente la riqueza y la interconexión de la región amazónica.

Inspirada en los vastos paisajes moldeados por el río y la selva tropical, la obra reúne los elementos naturales y culturales que definen la vida en el territorio. Las tradiciones indígenas, la pesca artesanal y el ecoturismo se representan junto a la diversa fauna que habita el ecosistema.

A través de una composición panorámica, la ilustración resalta la relación entre las comunidades y la naturaleza, celebrando la biodiversidad de la Amazonía al tiempo que refuerza la importancia de proteger su patrimonio ambiental y cultural.`;

const CLIENTS = [
  "Páramo Impacta",
  "WWF",
  "Profamilia",
  "Ana María Cosméticos",
  "Planeta",
  "WWF",
];

const CHIP_COLORS = [
  "bg-chip-rose",
  "bg-chip-cobalt",
  "bg-chip-teal",
  "bg-chip-coral",
  "bg-chip-sky",
  "bg-chip-lilac",
  "bg-chip-sage",
];

type Project = {
  title: string;
  brand: string;
  year: string;
  bg: string;
  icon: typeof Sun;
  cover?: string;
  gallery?: string[];
  text?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Próximamente",
    brand: "Páramo Impacta",
    year: "2024",
    bg: "bg-chip-coral",
    icon: Sun,
  },
  {
    title: "Próximamente",
    brand: "WWF",
    year: "2024",
    bg: "bg-chip-cobalt",
    icon: Star,
  },
  {
    title: "Ilustración para landing page",
    brand: "AARIMO",
    year: "2025",
    bg: "bg-chip-teal",
    icon: Flower,
    cover: aarimo1,
    gallery: [aarimo1, aarimo2, aarimo3, aarimo4, aarimoLaptop],
    text: AARIMO_TEXT,
  },
  {
    title: "Próximamente",
    brand: "Profamilia",
    year: "2023",
    bg: "bg-chip-lilac",
    icon: Heart,
  },
  {
    title: "Próximamente",
    brand: "Ana María Cosméticos",
    year: "2023",
    bg: "bg-chip-rose",
    icon: Brush,
  },
];

function App() {
  const [selected, setSelected] = useState<number | null>(null);
  const centerIndex = Math.floor(PROJECTS.length / 2);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* Nav */}
      <header className="relative z-10 p-2 sm:p-3">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border-[3px] border-nav-blue bg-cream px-6 py-4 sm:px-10">
          <a href="#top" className="block">
            <img src={logoValentinaInk} alt="Valentina Petalosi" className="h-10 sm:h-12" />
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-sans text-xs font-medium text-ink sm:gap-x-8 sm:text-sm">
            <a href="#top" className="transition hover:opacity-60">
              Inicio
            </a>
            <a href="#sobre-mi" className="transition hover:opacity-60">
              Sobre mí
            </a>
            <a href="#trabajos" className="transition hover:opacity-60">
              Proyectos
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=573054541737&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="transition hover:opacity-60"
            >
              Contáctame
            </a>
          </nav>
          <a
            href="https://www.instagram.com/petalosi.co"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Valentina Petalosi"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition hover:bg-ink hover:text-cream"
          >
            <InstagramIcon />
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* Hero illustration */}
        <section id="sobre-mi" className="bg-[#06462e] px-6 pb-2 pt-12 text-center sm:pt-16">
          <h1 className="font-display leading-tight text-cream">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              ¡Hola!
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              Soy Valentina Petalosi,
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              bienvenid@ a mi mundo ilustrado
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-snug text-cream sm:mt-4 sm:text-2xl md:text-[1.75rem]">
            Creo ilustraciones y universos creativos inspirados en la
            naturaleza y la fuerza femenina
          </p>

          <div className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-10">
            <img
              src={portadaBase2}
              alt="Ilustración de Valentina Petalosi"
              className="block w-full"
            />

            {STARS2.map((s, i) => (
              <img
                key={i}
                src={s.src}
                alt=""
                aria-hidden="true"
                className="spin-star absolute"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: `${s.width}%`,
                  animationDuration: s.duration,
                  animationDirection: s.reverse ? "reverse" : "normal",
                }}
              />
            ))}
          </div>
        </section>

        {/* Clients marquee */}
        <section id="clientes" className="border-y-2 border-ink py-6">
          <p className="px-6 pb-4 text-center font-sans text-lg font-semibold text-ink sm:px-10 sm:text-xl">
            He trabajado con marcas y proyectos como:
          </p>
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <span key={i} className="flex shrink-0 items-center gap-10">
                  <span
                    className={`${CHIP_COLORS[i % CLIENTS.length % CHIP_COLORS.length]} rounded-2xl px-6 py-3 font-display text-xl sm:text-3xl`}
                  >
                    {c}
                  </span>
                  <span aria-hidden className="text-2xl text-ink/30">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects carousel */}
        <section id="trabajos" className="overflow-x-clip bg-ink px-6 py-16 sm:px-10 sm:py-24">
          <h2 className="text-center font-display text-3xl tracking-tight text-cream sm:text-4xl">
            Proyectos
          </h2>
          <div className="no-scrollbar mt-16 flex flex-nowrap items-center justify-center overflow-x-auto px-8 py-10">
            {PROJECTS.map((p, i) => {
              const Icon = p.icon;
              const offset = i - centerIndex;
              const rotate = offset * 5;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  className="relative flex aspect-[3/4] w-56 shrink-0 flex-col overflow-hidden rounded-[2rem] text-left shadow-md transition-transform duration-200 first:ml-0 -ml-10 hover:z-20 hover:-translate-y-2 focus-visible:z-20 sm:w-64 sm:-ml-14"
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    zIndex: 10 - Math.abs(offset),
                  }}
                >
                  <div className={`${p.bg} relative flex flex-1 items-center justify-center`}>
                    {p.cover ? (
                      <img
                        src={p.cover}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="h-16 w-16 sm:h-20 sm:w-20" />
                    )}
                  </div>
                  <img
                    src={isotipoCream}
                    alt=""
                    aria-hidden="true"
                    className="absolute left-1/2 top-4 h-7 w-7 -translate-x-1/2"
                  />
                  <div className="bg-cream px-4 py-3">
                    <h3 className="font-display text-base font-bold leading-tight sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 font-sans text-xs text-ink/60 sm:text-sm">
                      {p.brand} · {p.year}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {selected !== null &&
        (() => {
          const project = PROJECTS[selected];
          const Icon = project.icon;
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6 py-10"
              onClick={() => setSelected(null)}
            >
              <div
                className={`${project.bg} relative max-h-full w-full ${project.gallery ? "max-w-3xl" : "max-w-2xl"} overflow-y-auto rounded-3xl p-6 shadow-xl sm:p-10`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink bg-cream text-lg transition hover:bg-ink hover:text-cream"
                >
                  ✕
                </button>
                <h3 className="font-display text-3xl font-bold sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-sans text-base text-ink/80 sm:text-lg">
                  {project.brand} · {project.year}
                </p>

                {project.gallery ? (
                  <div className="mt-6 flex flex-col gap-4">
                    {project.gallery.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        className="w-full rounded-2xl"
                      />
                    ))}
                    {project.text && (
                      <p className="whitespace-pre-line rounded-2xl bg-cream/90 p-5 font-sans text-sm leading-relaxed text-ink/80 sm:p-6 sm:text-base">
                        {project.text}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 flex aspect-[4/3] items-center justify-center rounded-2xl bg-cream/90">
                    <Icon />
                  </div>
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
}

export default App;
