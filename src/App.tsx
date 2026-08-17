import { Squiggle } from "./Doodles";
import mujerVoladora from "./assets/mujer-voladora.webp";

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

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-ink">
      <div className="animate-flyby pointer-events-none fixed left-0 top-24 z-20 w-56 sm:w-72 md:w-80">
        <img src={mujerVoladora} alt="" aria-hidden="true" className="bob w-full" />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          Valentina Petalosi
        </a>
        <nav className="hidden items-center gap-8 font-sans text-sm font-medium sm:flex">
          <a href="#sobre-mi" className="hover:opacity-60">
            Sobre mí
          </a>
          <a href="#trabajos" className="hover:opacity-60">
            Trabajos
          </a>
          <a href="#clientes" className="hover:opacity-60">
            Clientes
          </a>
        </nav>
        <a
          href="#contacto"
          className="rounded-full border border-ink px-5 py-2 text-sm font-medium transition hover:bg-ink hover:text-cream"
        >
          Contáctame
        </a>
      </header>

      <main id="top" className="relative z-10">
        {/* Headline + intro copy */}
        <section
          id="sobre-mi"
          className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center sm:px-10 sm:pt-20"
        >
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
          <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/70 sm:text-lg">
            Hago proyectos de ilustración para darle vida a tus productos,
            documentos institucionales, campañas, empaques y redes sociales.
          </p>
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
      </main>
    </div>
  );
}

export default App;
