"use client";

import { useState } from "react";
import { X, Trash2, Save, AlertTriangle, EyeOff } from "lucide-react";
import {
  AdminContact,
  ContactStatus,
  updateContact,
  deleteContact,
} from "@/app/painel/actions";
import { toast } from "sonner";

interface EditContactModalProps {
  contact: AdminContact;
  onClose: () => void;
  onSaved: () => void;
  onDeleted: () => void;
}

const STATUS_OPTIONS: { value: ContactStatus | ""; label: string }[] = [
  { value: "", label: "Pendente" },
  { value: "show", label: "Aprovado (visível no catálogo)" },
  { value: "hidden", label: "Oculto" },
];

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function EditContactModal({
  contact,
  onClose,
  onSaved,
  onDeleted,
}: EditContactModalProps) {
  const [form, setForm] = useState({
    name: contact.name,
    service: contact.service,
    phone: contact.phone.replace(/\D/g, ""),
    cities: contact.cities.join(", "),
    summary: contact.summary,
    description: contact.description,
    status: (contact.status ?? "") as ContactStatus | "",
  });
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 11) : value,
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const result = await updateContact(contact.id, {
      name: form.name,
      service: form.service,
      phone: form.phone,
      cities: form.cities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      summary: form.summary,
      description: form.description,
      status: form.status === "" ? null : (form.status as ContactStatus),
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (result.success) {
      toast.success("Contato atualizado com sucesso");
      onSaved();
    } else {
      toast.error(result.error ?? "Erro ao atualizar contato");
    }
  }

  async function handleHide() {
    setSaving(true);
    const result = await updateContact(contact.id, { status: "hidden" });
    setSaving(false);

    if (result.success) {
      toast.success("Contato ocultado");
      onSaved();
    } else {
      toast.error(result.error ?? "Erro ao ocultar contato");
    }
  }

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteContact(contact.id);
    setDeleting(false);

    if (result.success) {
      toast.success("Contato excluído");
      onDeleted();
    } else {
      toast.error(result.error ?? "Erro ao excluir contato");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={showDeleteConfirm ? undefined : onClose}
      />

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="relative z-10 w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Confirmar exclusão
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mb-5">
            Tem certeza que deseja excluir{" "}
            <span className="text-white font-medium">{contact.name}</span>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 py-2 rounded-xl border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
            >
              {deleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {!showDeleteConfirm && (
        <div className="relative z-10 w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-white">Editar contato</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSave}
            className="overflow-y-auto flex-1 p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Nome
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Serviço
                </label>
                <input
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Telefone
                </label>
                <input
                  name="phone"
                  value={maskPhone(form.phone)}
                  onChange={handleChange}
                  required
                  placeholder="(00) 00000-0000"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Cidades (separadas por vírgula)
                </label>
                <input
                  name="cities"
                  value={form.cities}
                  onChange={handleChange}
                  placeholder="São Paulo, Guarulhos"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Resumo
                </label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-sm transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Excluir
            </button>
            <div className="flex items-center gap-2">
              {contact.status === "show" && (
                <button
                  type="button"
                  onClick={handleHide}
                  disabled={saving}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-400 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-sm transition-all disabled:opacity-50"
                >
                  <EyeOff className="w-4 h-4" />
                  Esconder
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
