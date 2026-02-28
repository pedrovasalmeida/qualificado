"use client";

import { useState, useEffect } from "react";
import ContactCard, { Contact } from "@/components/ContactCard";
import { useDebounce } from "@/hooks/useDebounce";
import ContactModal from "@/components/ContactModal";
import ContactFormModal from "@/components/ContactFormModal";
import { showToast } from "@/lib/toast";
import { Search } from "lucide-react";

interface ContactCatalogProps {
  contacts: Contact[];
}

export default function ContactCatalog({ contacts }: ContactCatalogProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favoriteIds");
      if (stored) setFavoriteIds(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id];
      localStorage.setItem("favoriteIds", JSON.stringify(next));
      return next;
    });
  };

  const filteredContacts = contacts.filter((contact) => {
    const term = debouncedSearch.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.service.toLowerCase().includes(term) ||
      contact.cities.some((city) => city.toLowerCase().includes(term))
    );
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const aFav = favoriteIds.includes(a.id);
    const bFav = favoriteIds.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.name.localeCompare(b.name, "pt-BR");
  });

  return (
    <>
      {/* Top banner */}
      <div
        className="flex items-center justify-center gap-1 z-50 bg-zinc-950 border-b border-zinc-700 fixed top-0 py-2 text-xs w-screen left-0 mx-auto text-center text-zinc-600 animate-in fade-in duration-700"
        style={{ animationDelay: "500ms" }}
      >
        Você pode cadastrar seu contato{" "}
        <button
          onClick={() => setIsContactFormOpen(true)}
          className="animate-pulse text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4 pointer-events-auto font-medium cursor-pointer"
        >
          clicando aqui.
        </button>
      </div>

      {/* Search Bar */}
      <div
        className="mb-10 relative animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
        style={{ animationDelay: "100ms" }}
      >
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

      {/* Modal Overlays */}
      <ContactModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onCopy={(msg) => showToast.success(msg)}
      />

      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        onSuccess={(msg) => showToast.success(msg)}
        onError={(msg) => showToast.error(msg)}
      />
    </>
  );
}
