"use client";

import { useState } from "react";
import ContactCard, { Contact } from "@/components/ContactCard";
import ContactModal from "@/components/ContactModal";
import ContactFormModal from "@/components/ContactFormModal";
import { Search } from "lucide-react";

// Mock data updated with rich descriptions
const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Oficina do João",
    service: "Mecânica Geral",
    summary: "Serviço especializado em motores e revisão preventiva.",
    description: "Serviço especializado em motores e revisão preventiva. Atendemos emergências 24h. Mais de 15 anos de experiência entregando o melhor para o seu veículo com garantia de serviço.",
    phone: "(11) 9 1234-5678",
    cities: ["Cidade 1"],
  },
  {
    id: 2,
    name: "Boutique Flor de Lis",
    service: "Moda Feminina",
    summary: "Moda feminina elegante para todas as ocasiões.",
    description: "Moda feminina elegante para todas as ocasiões. Venha conhecer nossa nova coleção de inverno com peças exclusivas.",
    phone: "(11) 9 2345-6789",
    cities: ["Cidade 1", "Cidade 2"],
  },
  {
    id: 3,
    name: "Eletricista Rápido",
    service: "Serviços Elétricos",
    summary: "Instalação, manutenção preventiva e reparos elétricos residenciais.",
    description: "Instalação, manutenção preventiva e reparos elétricos residenciais. Atendimento rápido e orçamento sem compromisso em até 2 horas.",
    phone: "(11) 9 3456-7890",
    cities: ["Cidade 1", "Cidade 2", "Cidade 3"],
  },
  {
    id: 4,
    name: "Restaurante Sabor Bom",
    service: "Alimentação",
    summary: "Comida caseira deliciosa, pratos feitos e marmitas.",
    description: "Comida caseira deliciosa, pratos feitos e marmitas. Peça pelo WhatsApp! Entregamos rapidamente na sua casa ou no trabalho.",
    phone: "(11) 9 4567-8901",
    cities: ["Cidade 2", "Cidade 3"],
  },
  {
    id: 5,
    name: "Tech Fix",
    service: "Assistência Técnica",
    summary: "Conserto de celulares, notebooks e computadores.",
    description: "Conserto de celulares, notebooks e computadores. Recuperação de dados e troca de telas na hora. Profissionais altamente qualificados.",
    phone: "(11) 9 5555-6666",
    cities: ["Cidade 1", "Cidade 4"],
  },
  {
    id: 6,
    name: "LimpBem",
    service: "Limpeza de Estofados",
    summary: "Limpeza e impermeabilização de sofás, tapetes e colchões.",
    description: "Limpeza e impermeabilização de sofás, tapetes e colchões. Usamos produtos profissionais e seguros para pets.",
    phone: "(11) 9 6666-7777",
    cities: ["Cidade 1"],
  },
];

export default function Home() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const filteredContacts = MOCK_CONTACTS.filter(contact => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.service.toLowerCase().includes(term) ||
      contact.cities.some(city => city.toLowerCase().includes(term))
    );
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const aFav = favoriteIds.includes(a.id);
    const bFav = favoriteIds.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0; // maintain original order for the rest
  });

  // We are using a client component for state, so we need to move the mock data to a Server Component later or convert this to 'use client'.
  // We'll add 'use client' at the top since we use React state for the modal.
  return (
    <main className="min-h-screen relative selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-black pointer-events-none -z-10" />

      {/* Header section */}
      <div className="relative pt-16 pb-12 px-6">
        <div className="flex items-center justify-center gap-1 z-50 bg-zinc-950 border-b border-zinc-700 fixed top-0 py-1 text-xs w-screen left-0 mx-auto text-center text-zinc-600 animate-in fade-in duration-700" style={{ animationDelay: '500ms' }}>
          Você pode cadastrar seu contato <button onClick={() => setIsContactFormOpen(true)} className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4 pointer-events-auto font-medium cursor-pointer">clicando aqui.</button>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">Catálogo Digital</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 tracking-tight mb-4">
            Qualificado
          </h1>

          <p className="text-zinc-400 max-w-lg mx-auto text-lg">
            Encontre os melhores prestadores de serviço e lojas da região, tudo em um só lugar.
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        {/* Search Bar */}
        <div className="mb-10 relative max-w-lg mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-y-0 left-0 pl-4 z-10 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="w-full bg-zinc-900/80 border border-zinc-800/80 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
            placeholder="Buscar por nome, categoria ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {sortedContacts.length === 0 ? (
          <div className="flex items-center justify-center p-12 text-zinc-500 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
            Nenhum contato encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedContacts.map((contact, index) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onOpenDetails={setSelectedContact}
                isFavorite={favoriteIds.includes(contact.id)}
                onToggleFavorite={(e) => toggleFavorite(e, contact.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Overlays */}
      <ContactModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />

      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </main>
  );
}
