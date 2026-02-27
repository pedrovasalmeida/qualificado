"use client";

import { X, Phone, MapPin, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Contact } from "./ContactCard";

interface ContactModalProps {
  contact: Contact | null;
  onClose: () => void;
}

export default function ContactModal({ contact, onClose }: ContactModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  if (!contact) return null;

  const handleWhatsApp = () => {
    const phoneNumber = contact.phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${phoneNumber}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.phone);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
              {contact.service}
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">{contact.name}</h2>

            <div className="flex items-center gap-2 text-zinc-400 mb-6">
              <MapPin size={16} className="text-zinc-500" />
              <span className="text-sm">{contact.cities.join(" • ")}</span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">Descrição</h3>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {contact.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider">Contato</h3>
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                  <div className="flex items-center gap-3 text-white">
                    <Phone size={18} className="text-blue-400" />
                    <span className="font-medium">{contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3.5 px-4 rounded-xl font-medium transition-colors border border-zinc-700/50"
            >
              {isCopied ? <Check size={20} className="text-green-500" /> : <Copy size={20} className="text-zinc-400" />}
              {isCopied ? "Copiado!" : "Copiar"}
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-xl font-medium transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={20} />
              Chamar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
