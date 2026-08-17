import { useEffect, useState } from "react";
import { Brush, Flower, Heart, InstagramIcon, Squiggle, Star, Sun } from "./Doodles";
import mujerVoladora from "./assets/mujer-voladora.webp";
import fotoPortafolio from "./assets/foto-portafolio.webp";
import logoValentina from "./assets/logo-valentina.webp";

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

const PROJECTS = [
  {
    client: "Páramo Impacta",
    description: "Próximamente",
    year: "2024",
    bg: "bg-chip-coral",
    icon: Sun,
  },
  {
    client: "WWF",
    description: "Próximamente",
    year: "2024",
    bg: "bg-chip-cobalt",
    icon: Star,
  },
  {
    client: "AARIMO",
    description: "Ilustración para landing page",
    year: "2025",
    bg: "bg-chip-teal",
    icon: Flower,
  },
  {
    client: "Profamilia",
    description: "Próximamente",
    year: "2023",
    bg: "bg-chip-lilac",
    icon: Heart,
  },
  {
    client: "Ana María Cosméticos",
    description: "Próximamente",
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
        {/* Headline + intro copy */}
        <section id="sobre-mi" className="grid md:grid-cols-[minmax(280px,38%)_1fr]">
          <div className="bg-chip-coral">
            <img
              src={fotoPortafolio}
              alt="Valentina Petalosi en su estudio"
              className="h-full max-h-[420px] w-full object-cover md:max-h-none"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 md:py-20">
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              <span className="italic">¡Hola!</span> Soy{" "}
              <span className="font-bold">Valentina Petalosi</span>,
              bienvenid<span className="text-outline">@</span> a mi{" "}
              <span className="relative inline-block">
                mundo
                <Squiggle className="absolute -bottom-2 left-0 h-4 w-full text-sun" />
              </span>{" "}
              ilustrado.
            </h1>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/70 sm:text-lg">
              Hago proyectos de ilustración para darle vida a tus productos,
              documentos institucionales, campañas, empaques y redes
              sociales.
            </p>
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
              const isCenter = offset === 0;
              const rotate = offset * 6;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`${p.bg} stamp-edge relative flex w-56 shrink-0 flex-col gap-3 p-5 text-left shadow-md transition-transform duration-200 first:ml-0 -ml-10 hover:z-20 hover:-translate-y-2 focus-visible:z-20 sm:w-72 sm:-ml-16 sm:p-6`}
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    zIndex: 10 - Math.abs(offset),
                  }}
                >
                  <div>
                    <h3 className="font-display text-lg font-bold sm:text-2xl">
                      {p.client}
                    </h3>
                    {isCenter && (
                      <>
                        <p className="font-sans text-sm text-ink/80 sm:text-base">
                          {p.description}
                        </p>
                        <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wide text-ink/50">
                          {p.year}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-cream/90">
                    <Icon className="h-16 w-16 sm:h-20 sm:w-20" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6 py-10"
          onClick={() => setSelected(null)}
        >
          <div
            className={`${PROJECTS[selected].bg} relative max-h-full w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-xl sm:p-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-ink bg-cream text-lg transition hover:bg-ink hover:text-cream"
            >
              ✕
            </button>
            <h3 className="font-display text-3xl font-bold sm:text-4xl">
              {PROJECTS[selected].client}
            </h3>
            <p className="mt-2 font-sans text-base text-ink/80 sm:text-lg">
              {PROJECTS[selected].description}
            </p>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wide text-ink/50">
              {PROJECTS[selected].year}
            </p>
            <div className="mt-6 flex aspect-[4/3] items-center justify-center rounded-2xl bg-cream/90">
              {(() => {
                const Icon = PROJECTS[selected].icon;
                return <Icon />;
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
