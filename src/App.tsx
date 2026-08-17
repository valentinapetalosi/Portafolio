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
    client: "AARIMO",
    description: "Ilustración para landing page",
    year: "2025",
    bg: "bg-chip-teal",
    icon: Flower,
  },
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
        <section id="trabajos" className="px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Proyectos
          </h2>
          <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {PROJECTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={i}
                  className={`${p.bg} flex w-72 shrink-0 snap-start flex-col gap-4 rounded-3xl p-5 shadow-sm sm:w-80`}
                >
                  <div>
                    <h3 className="font-display text-xl font-bold sm:text-2xl">
                      {p.client}
                    </h3>
                    <p className="font-sans text-sm text-ink/80">{p.description}</p>
                    <p className="mt-1 font-sans text-xs font-medium uppercase tracking-wide text-ink/50">
                      {p.year}
                    </p>
                  </div>
                  <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-cream/90">
                    <Icon />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
