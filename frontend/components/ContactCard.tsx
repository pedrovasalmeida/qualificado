"use client";

import { Phone, MessageCircle } from "lucide-react";

export interface Contact {
  id: number;
  name: string;
  service: string;
  phone: string;
  cities: string[];
}

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard({ contact }: ContactCardProps) {
  const handleWhatsApp = () => {
    const phoneNumber = contact.phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${phoneNumber}`, "_blank");
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
      <h3 className="text-lg font-bold text-blue-900 mb-3">{contact.name}</h3>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">{contact.service}</p>

        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">{contact.phone}</span>
        </div>

        <p className="text-xs text-gray-500">{contact.cities.join(" | ")}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 rounded-lg border-2 border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50">
          Ver mais
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>
      </div>
    </div>
  );
}
