"use client";

import { useState, useTransition, useMemo } from "react";
import {
  Check,
  X,
  Search,
  ChevronUp,
  ChevronDown,
  Pencil,
  Phone,
  MapPin,
  Clock,
  ArrowUpDown,
  Trash2,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import {
  AdminContact,
  approveContact,
  dismissContact,
  getAdminContacts,
  getPendingContacts,
  bulkDeleteContacts,
  bulkHideContacts,
} from "@/app/painel/actions";
import EditContactModal from "@/components/admin/EditContactModal";
import ContactDetailModal from "@/components/admin/ContactDetailModal";
import { toast } from "sonner";

interface ContactsClientProps {
  initialPending: AdminContact[];
  initialContacts: AdminContact[];
}

type OrderBy = "created_at" | "name";
type OrderDir = "asc" | "desc";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  show: { label: "Aprovado", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  hidden: { label: "Oculto", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}


export default function ContactsClient({
  initialPending,
  initialContacts,
}: ContactsClientProps) {
  const [pending, setPending] = useState<AdminContact[]>(initialPending);
  const [contacts, setContacts] = useState<AdminContact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy>("created_at");
  const [orderDir, setOrderDir] = useState<OrderDir>("desc");
  const [viewingContact, setViewingContact] = useState<AdminContact | null>(null);
  const [editingContact, setEditingContact] = useState<AdminContact | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  // Filtered and sorted contacts
  const filteredContacts = useMemo(() => {
    const term = search.toLowerCase();
    let result = contacts;

    if (term) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.service.toLowerCase().includes(term)
      );
    }

    return [...result].sort((a, b) => {
      if (orderBy === "name") {
        return orderDir === "asc"
          ? a.name.localeCompare(b.name, "pt-BR")
          : b.name.localeCompare(a.name, "pt-BR");
      }
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return orderDir === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [contacts, search, orderBy, orderDir]);

  const allFilteredSelected =
    filteredContacts.length > 0 &&
    filteredContacts.every((c) => selectedIds.has(c.id));

  function toggleOrder(field: OrderBy) {
    if (orderBy === field) {
      setOrderDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(field);
      setOrderDir("asc");
    }
  }

  function SortIcon({ field }: { field: OrderBy }) {
    if (orderBy !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-zinc-600" />;
    return orderDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
    );
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (allFilteredSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredContacts.forEach((c) => next.delete(c.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredContacts.forEach((c) => next.add(c.id));
        return next;
      });
    }
  }

  async function handleBulkHide() {
    const ids = Array.from(selectedIds);
    const result = await bulkHideContacts(ids);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (selectedIds.has(c.id) ? { ...c, status: "hidden" } : c))
      );
      setSelectedIds(new Set());
      toast.success(`${ids.length} contato(s) ocultado(s)`);
    } else {
      toast.error(result.error ?? "Erro ao ocultar contatos");
    }
  }

  async function handleBulkDelete() {
    const ids = Array.from(selectedIds);
    const result = await bulkDeleteContacts(ids);
    if (result.success) {
      setPending((prev) => prev.filter((c) => !selectedIds.has(c.id)));
      setContacts((prev) => prev.filter((c) => !selectedIds.has(c.id)));
      setSelectedIds(new Set());
      toast.success(`${ids.length} contato(s) excluído(s)`);
    } else {
      toast.error(result.error ?? "Erro ao excluir contatos");
    }
  }

  async function handleApprove(id: string) {
    const result = await approveContact(id);
    if (result.success) {
      setPending((prev) => prev.filter((c) => c.id !== id));
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "show" } : c))
      );
      toast.success("Contato aprovado");
    } else {
      toast.error(result.error ?? "Erro ao aprovar contato");
    }
  }

  async function handleDismiss(id: string) {
    const result = await dismissContact(id);
    if (result.success) {
      setPending((prev) => prev.filter((c) => c.id !== id));
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "hidden" } : c))
      );
      toast.success("Contato ocultado");
    } else {
      toast.error(result.error ?? "Erro ao ocultar contato");
    }
  }

  function handleSaved() {
    setEditingContact(null);
    startTransition(async () => {
      const [updated, updatedPending] = await Promise.all([
        getAdminContacts(),
        getPendingContacts(),
      ]);
      setContacts(updated);
      setPending(updatedPending);
    });
  }

  function handleDeleted() {
    if (editingContact) {
      const id = editingContact.id;
      setPending((prev) => prev.filter((c) => c.id !== id));
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
    setEditingContact(null);
  }

  function handleRefresh() {
    startTransition(async () => {
      const [updated, updatedPending] = await Promise.all([
        getAdminContacts(),
        getPendingContacts(),
      ]);
      setContacts(updated);
      setPending(updatedPending);
    });
  }

  function handleViewEdit() {
    if (viewingContact) {
      const contact = viewingContact;
      setViewingContact(null);
      setEditingContact(contact);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-white">Contatos</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Gerencie os contatos cadastrados na plataforma
        </p>
      </div>

      {/* Seção: Pendentes */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-white">Pendentes</h2>
          {pending.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-xs font-bold text-white">
              {pending.length}
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="flex items-center justify-center h-24 rounded-2xl border border-dashed border-zinc-800 text-zinc-600 text-sm">
            Nenhum contato pendente de revisão
          </div>
        ) : (
          <div className="space-y-2">
            {pending.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">
                      {contact.name}
                    </span>
                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                      {contact.service}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 shrink-0" />
                      {contact.phone}
                    </span>
                    {contact.cities.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {contact.cities.join(", ")}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 shrink-0" />
                      {formatDate(contact.created_at)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDismiss(contact.id)}
                    title="Ignorar"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    Ignorar
                  </button>
                  <button
                    onClick={() => handleApprove(contact.id)}
                    title="Aprovar"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Aprovar
                  </button>
                  <button
                    onClick={() => setEditingContact(contact)}
                    title="Editar"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seção: Todos os contatos */}
      <section>
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white">
              Todos os contatos
            </h2>
            <span className="text-xs text-zinc-500">
              {filteredContacts.length} de {contacts.length}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isPending}
              title="Atualizar lista"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou serviço..."
              className="pl-8 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 w-64 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 mb-3 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 flex-wrap">
            <span className="text-xs text-zinc-400 flex-1">
              {selectedIds.size} selecionado(s)
            </span>
            <button
              onClick={handleBulkHide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all"
            >
              <EyeOff className="w-3.5 h-3.5" />
              Ocultar selecionados
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:text-red-300 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Excluir selecionados
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Desmarcar todos
            </button>
          </div>
        )}

        {/* Tabela */}
        <div className="rounded-2xl border border-zinc-800 overflow-auto max-h-[60vh]">
          <table className="w-full min-w-160 text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-500">
                <th className="w-8 px-4 py-2.5 text-left font-normal">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded accent-blue-500 cursor-pointer"
                    aria-label="Selecionar todos"
                  />
                </th>
                <th className="px-4 py-2.5 text-left font-normal">
                  <button
                    onClick={() => toggleOrder("name")}
                    className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                  >
                    Nome
                    <SortIcon field="name" />
                  </button>
                </th>
                <th className="px-4 py-2.5 text-left font-normal">Serviço / Cidade</th>
                <th className="px-4 py-2.5 text-left font-normal">
                  <button
                    onClick={() => toggleOrder("created_at")}
                    className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                  >
                    Data
                    <SortIcon field="created_at" />
                  </button>
                </th>
                <th className="px-4 py-2.5 text-left font-normal">Status</th>
                <th className="w-10 px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-zinc-600 text-sm">
                    {search
                      ? "Nenhum contato encontrado para esta busca"
                      : "Nenhum contato cadastrado"}
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => {
                  const statusInfo = contact.status
                    ? STATUS_LABELS[contact.status]
                    : null;
                  const isSelected = selectedIds.has(contact.id);

                  return (
                    <tr
                      key={contact.id}
                      className={`transition-colors cursor-pointer ${
                        isSelected ? "bg-blue-500/5" : "hover:bg-zinc-900/40"
                      }`}
                      onClick={() => setViewingContact(contact)}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(contact.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-3.5 h-3.5 rounded accent-blue-500 cursor-pointer"
                        />
                      </td>

                      <td className="px-4 py-3 max-w-50">
                        <p className="text-sm font-medium text-white truncate">
                          {contact.name}
                        </p>
                        <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 shrink-0" />
                          {contact.phone}
                        </p>
                      </td>

                      <td className="px-4 py-3 max-w-50">
                        <p className="text-sm text-zinc-300 truncate">{contact.service}</p>
                        {contact.cities.length > 0 && (
                          <p className="text-xs text-zinc-600 truncate mt-0.5">
                            {contact.cities.join(", ")}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-xs text-zinc-600">
                        {formatDate(contact.created_at)}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border whitespace-nowrap ${
                            statusInfo
                              ? statusInfo.className
                              : "bg-zinc-800/50 text-zinc-500 border-zinc-700/50"
                          }`}
                        >
                          {statusInfo ? statusInfo.label : "Pendente"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingContact(contact);
                          }}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal de detalhes */}
      {viewingContact && !editingContact && (
        <ContactDetailModal
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
          onEdit={handleViewEdit}
        />
      )}

      {/* Modal de edição */}
      {editingContact && (
        <EditContactModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
