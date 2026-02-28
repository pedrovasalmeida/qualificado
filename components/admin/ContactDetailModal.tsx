"use client";

import { Phone, MapPin, Clock, X, Pencil } from "lucide-react";
import { AdminContact } from "@/app/painel/actions";

interface ContactDetailModalProps {
  contact: AdminContact;
  onClose: () => void;
  onEdit: () => void;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  show: { label: "Aprovado", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  hidden: { label: "Oculto", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  ignored: { label: "Ignorado", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ContactDetailModal({
  contact,
  onClose,
  onEdit,
}: ContactDetailModalProps) {
  const statusInfo = contact.status ? STATUS_LABELS[contact.status] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-sm font-semibold text-white truncate">
              {contact.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                {contact.service}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${
                  statusInfo
                    ? statusInfo.className
                    : "bg-zinc-800/50 text-zinc-500 border-zinc-700/50"
                }`}
              >
                {statusInfo ? statusInfo.label : "Pendente"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Info row */}
          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {contact.phone}
            </span>
            {contact.cities.length > 0 && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {contact.cities.join(", ")}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(contact.created_at)}
            </span>
          </div>

          {/* Summary */}
          {contact.summary && (
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1.5">Resumo</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {contact.summary}
              </p>
            </div>
          )}

          {/* Description */}
          {contact.description && (
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1.5">
                Descrição
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {contact.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-zinc-800">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
