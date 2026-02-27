"use client";

import { Phone, MessageCircle, Info, Heart, MapPin } from "lucide-react";

export interface Contact {
  id: number;
  name: string;
  service: string;
  summary: string;
  description: string;
  phone: string;
  cities: string[];
}

interface ContactCardProps {
  contact: Contact;
  onOpenDetails: (contact: Contact) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  index?: number; // for staggered animation
}

export default function ContactCard({ contact, onOpenDetails, isFavorite = false, onToggleFavorite, index = 0 }: ContactCardProps) {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneNumber = contact.phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${phoneNumber}`, "_blank");
  };

  return (
    <div
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/80 p-5 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms`, animationDuration: '500ms' }}
      onClick={() => onOpenDetails(contact)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-xs font-semibold text-zinc-300 border border-zinc-700/50">
            {contact.service}
          </span>
          <button
            onClick={onToggleFavorite}
            className="p-1.5 -m-1.5 rounded-full text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 transition-colors"
          >
            <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
          {contact.name}
        </h3>

        <p className="text-sm text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
          {contact.summary}
        </p>

        {contact.cities && contact.cities.length > 0 && (
          <div className="flex items-center gap-1.5 text-zinc-500 mb-5 text-xs font-medium">
            <MapPin size={14} />
            <span>{contact.cities[0]} {contact.cities.length > 1 && `+${contact.cities.length - 1}`}</span>
          </div>
        )}
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium bg-zinc-950/50 w-fit px-3 py-1.5 rounded-lg border border-zinc-800/50">
          <Phone className="h-4 w-4 text-blue-500" />
          <span>{contact.phone}</span>
        </div>

        <div className="flex gap-2 pt-2 border-t border-zinc-800/50">
          <button
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-700"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(contact);
            }}
          >
            <Info className="h-4 w-4 text-zinc-400" />
            Detalhes
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
