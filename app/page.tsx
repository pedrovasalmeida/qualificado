import { getContacts } from "@/app/actions";
import ContactCatalog from "@/components/ContactCatalog";

export default async function Home() {
  const contacts = await getContacts();

  return (
    <main className="min-h-screen relative selection:bg-blue-500/30">
      {/* Header section */}
      <div className="relative pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">
              Catálogo Digital
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 tracking-tight mb-4">
            Qualificado
          </h1>

          <p className="text-zinc-400 max-w-lg mx-auto text-lg">
            Encontre os melhores prestadores de serviço e lojas da região, tudo
            em um só lugar.
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <ContactCatalog contacts={contacts} />
      </div>
    </main>
  );
}
