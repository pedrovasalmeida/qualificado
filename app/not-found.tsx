import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Decorative blur blobs */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-zinc-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-lg w-full">
        {/* Glitched 404 */}
        <div className="relative mb-8 select-none" aria-hidden="true">
          <span
            className="block text-[clamp(7rem,22vw,12rem)] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-600 [text-shadow:none]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            404
          </span>
          {/* Glitch layers */}
          <span
            className="absolute inset-0 block text-[clamp(7rem,22vw,12rem)] font-black leading-none tracking-tighter text-blue-500/20 select-none animate-[glitch-r_3s_infinite_steps(1)]"
            style={{
              clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
              transform: "translateX(3px)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 block text-[clamp(7rem,22vw,12rem)] font-black leading-none tracking-tighter text-zinc-400/10 select-none"
            style={{
              clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
              transform: "translateX(-2px)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            404
          </span>
        </div>

        {/* Divider line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mb-8" />

        {/* Message */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-xs font-medium text-zinc-300 uppercase tracking-widest">
            Página não encontrada
          </span>
        </div>

        <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-sm">
          O endereço que você acessou não existe ou foi movido. Volte para o
          catálogo e encontre o que precisa.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Voltar ao catálogo
        </Link>
      </div>

      <style>{`
        @keyframes glitch-r {
          0%, 90%, 100% { opacity: 0; transform: translateX(3px); }
          92% { opacity: 1; transform: translateX(3px); }
          94% { opacity: 0; transform: translateX(-3px); }
          96% { opacity: 1; transform: translateX(1px); }
          98% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}
