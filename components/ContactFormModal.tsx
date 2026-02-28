"use client";

import { X, Send, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createContact } from "@/app/actions";
import { formatPhoneDisplay, stripPhone } from "@/lib/phone";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function ContactFormModal({
  isOpen,
  onClose,
  onSuccess,
  onError,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    phone: "",
    cities: "",
    summary: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      return () => document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneDisplay(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      service: "",
      phone: "",
      cities: "",
      summary: "",
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      onError("Número de telefone inválido.");
      return;
    }

    setIsSubmitting(true);

    const cities = formData.cities
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const result = await createContact({
      name: formData.name,
      service: formData.service,
      phone: stripPhone(formData.phone),
      cities,
      summary: formData.summary,
      description: formData.description,
    });

    setIsSubmitting(false);

    if (result.success) {
      onSuccess(
        "Seu cadastro foi enviado com sucesso! Ele passará por uma revisão antes de ser publicado.",
      );
      clearForm();
      onClose();
    } else {
      onError("Erro ao enviar cadastro. Por favor, tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-zinc-800/50 flex-none">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold text-white">Cadastrar Contato</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Preencha os dados abaixo para solicitar o cadastro.
          </p>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Nome do Contato / Empresa *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Oficina do João"
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Serviço / Categoria *
              </label>
              <input
                type="text"
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                placeholder="Ex: Mecânica Geral"
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                inputMode="numeric"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                maxLength={15}
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="cities"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Cidades Atendidas *
              </label>
              <input
                type="text"
                id="cities"
                name="cities"
                required
                value={formData.cities}
                onChange={handleChange}
                placeholder="Ex: São Paulo, Campinas"
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Resumo *
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                required
                value={formData.summary}
                onChange={handleChange}
                placeholder="Breve resumo para exibição no card..."
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Descrição Completa *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Descreva brevemente os serviços prestados..."
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-zinc-800/50 flex gap-3 flex-none bg-zinc-900/80 backdrop-blur-md">
          <button
            type="button"
            onClick={clearForm}
            className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <Trash2 size={18} />
            Limpar
          </button>
          <button
            type="submit"
            form="contact-form"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
