import { useEffect, useState } from "react";
import { Brush, Flower, Heart, InstagramIcon, Star, Sun } from "./Doodles";
import mujerVoladora from "./assets/mujer-voladora.webp";
import logoValentina from "./assets/logo-valentina.webp";
import portadaBase from "./assets/portada/portada-base.webp";
import starBigL from "./assets/portada/star-big-l.webp";
import starBigR from "./assets/portada/star-big-r.webp";
import starDiamondL from "./assets/portada/star-diamond-l.webp";
import starDiamondR from "./assets/portada/star-diamond-r.webp";
import starSparkL from "./assets/portada/star-spark-l.webp";
import starSparkR from "./assets/portada/star-spark-r.webp";
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

const STARS = [
  { src: starBigL, left: 25, top: 14.583, width: 4.1667, duration: "9s" },
  { src: starBigR, left: 75, top: 14.583, width: 4.1667, duration: "10s", reverse: true },
  { src: starDiamondL, left: 10.729, top: 42.708, width: 2.29, duration: "6s", reverse: true },
  { src: starDiamondR, left: 89.271, top: 42.708, width: 2.29, duration: "6.5s" },
  { src: starSparkL, left: 20.417, top: 15.833, width: 3.75, duration: "7.5s" },
  { src: starSparkR, left: 78.542, top: 18.75, width: 3.3333, duration: "8s", reverse: true },
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
      <div className="animate-flyby pointer-events-none fixed left-0 top-24 z-20 w-56 sm:w-72 md:w-80">
        <img src={mujerVoladora} alt="" aria-hidden="true" className="bob w-full" />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between bg-blue px-6 py-4 sm:px-10">
        <a href="#top" className="block">
          <img src={logoValentina} alt="Valentina Petalosi" className="h-10 sm:h-12" />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.instagram.com/petalosi.co"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Valentina Petalosi"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-cream transition hover:bg-ink hover:text-cream"
          >
            <InstagramIcon />
          </a>
          <a
            href="mailto:valentinapetalosi@gmail.com"
            className="rounded-full border border-ink bg-cream px-4 py-2 text-sm font-medium transition hover:bg-ink hover:text-cream sm:px-5"
          >
            Email
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=573054541737&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink bg-cream px-4 py-2 text-sm font-medium transition hover:bg-ink hover:text-cream sm:px-5"
          >
            Contáctame
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* Hero illustration */}
        <section id="sobre-mi" className="bg-[#06462e]">
          <div className="relative mx-auto w-full max-w-6xl">
            <img
              src={portadaBase}
              alt="Ilustración de Valentina Petalosi"
              className="block w-full"
            />

            {STARS.map((s, i) => (
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

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <h1 className="font-display text-xl leading-tight text-cream sm:text-3xl md:text-4xl lg:text-5xl">
                Bienvenid<span className="text-cream">@</span> a mi mundo
                ilustrado
              </h1>
              <p className="mt-2 max-w-[26ch] font-sans text-[0.6rem] leading-snug text-cream/85 sm:mt-4 sm:max-w-sm sm:text-sm md:text-base">
                Creo ilustraciones y universos creativos inspirados en la
                naturaleza y la fuerza femenina
              </p>
            </div>
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
