import { Brush, Flower, Heart, Squiggle, Star, Sun } from "./Doodles";
import linaje from "./assets/linaje.webp";

const CLIENTS = [
  "Páramo Impacta",
  "WWF",
  "Profamilia",
  "Ana María Cosméticos",
  "Planeta",
  "WWF",
];

const blocks = [
  { bg: "bg-pink", content: <Flower />, tilt: "-rotate-2" },
  { bg: "bg-blue", content: <Star />, tilt: "rotate-1" },
  {
    bg: "bg-ink",
    content: (
      <span className="rounded-full bg-cream px-6 py-3 font-display text-lg italic text-ink">
        Hola ✦
      </span>
    ),
    tilt: "-rotate-1",
  },
  { bg: "bg-sun", content: <Sun />, tilt: "rotate-2" },
  { bg: "bg-green", content: <Brush />, tilt: "-rotate-1" },
  { bg: "bg-pink", content: <Heart />, tilt: "rotate-2" },
];

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-ink">
      <img
        src={linaje}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-50"
      />

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
        {/* Color strip */}
        <section className="px-6 pt-4 sm:px-10">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {blocks.map((b, i) => (
              <div
                key={i}
                className={`animate-float ${b.tilt} ${b.bg} flex h-40 w-40 shrink-0 items-center justify-center rounded-3xl shadow-sm sm:h-48 sm:w-52`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {b.content}
              </div>
            ))}
          </div>
        </section>

        {/* Intro copy */}
        <section className="px-6 pt-10 sm:px-10">
          <p className="max-w-xl font-sans text-base leading-relaxed text-ink/70 sm:text-lg">
            Ilustro para marcas que quieren decir algo con color, textura y
            calidez. Cada proyecto es una excusa para contar una historia
            distinta.
          </p>
        </section>

        {/* Headline */}
        <section id="sobre-mi" className="px-6 pb-16 pt-10 sm:px-10 sm:pt-16">
          <h1 className="max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="italic">¡Hola!</span> Soy{" "}
            <span className="font-bold">Valentina Petalosi</span>,
            bienvenid<span className="text-outline">@</span> a mi{" "}
            <span className="relative inline-block">
              mundo
              <Squiggle className="absolute -bottom-2 left-0 h-4 w-full text-sun" />
            </span>{" "}
            ilustrado.
          </h1>
        </section>

        {/* Clients marquee */}
        <section id="clientes" className="border-y-2 border-ink py-6">
          <p className="px-6 pb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/50 sm:px-10">
            He trabajado con
          </p>
          <div className="relative flex overflow-hidden">
            <div className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10 font-display text-2xl sm:text-4xl">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <span key={i} className="flex shrink-0 items-center gap-10">
                  {c}
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
