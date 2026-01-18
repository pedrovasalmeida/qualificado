"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function RegistrationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-blue-400/90 px-4 py-1 text-white">
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-3">
        <p className="text-sm font-medium text-center ml-auto">
          Deseja cadastrar seu contato?{" "}
          <Link
            href="/cadastro"
            className="underline decoration-2 underline-offset-2 hover:text-blue-100 transition-colors font-semibold"
          >
            Clique aqui
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto shrink-0 rounded-full p-1 hover:bg-blue-600 transition-colors"
          aria-label="Fechar mensagem"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
