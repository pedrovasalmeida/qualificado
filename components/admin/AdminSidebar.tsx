"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { toast } from "sonner";
import {
  Users,
  ContactRound,
  LogOut,
  RefreshCw,
  UserCog,
} from "lucide-react";

interface AdminSidebarProps {
  userEmail: string;
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ userEmail, open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/painel/login");
    router.refresh();
  }

  function handleInvalidateCache() {
    toast.success("Cache invalidado com sucesso");
  }

  const navItems = [
    {
      href: "/painel/contatos",
      label: "Contatos",
      icon: ContactRound,
      active: true,
    },
    {
      href: "/painel/usuarios",
      label: "Usuários",
      icon: Users,
      active: false,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-56 border-r border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm flex flex-col z-50 transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800/60">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
            Qualificado
          </span>
          <span className="text-xs text-zinc-600 font-mono">admin</span>
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          if (!item.active) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-700 cursor-not-allowed select-none"
                title="Em breve"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
                <span className="ml-auto text-xs text-zinc-700 font-mono">
                  em breve
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="px-3 py-4 border-t border-zinc-800/60 space-y-1">
        {/* Invalidar cache */}
        <button
          onClick={handleInvalidateCache}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all text-left"
        >
          <RefreshCw className="w-4 h-4" />
          Invalidar cache
        </button>

        {/* Usuário logado */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/40">
          <UserCog className="w-4 h-4 text-zinc-500 shrink-0" />
          <span className="text-xs text-zinc-500 truncate flex-1">
            {userEmail}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all text-left"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
