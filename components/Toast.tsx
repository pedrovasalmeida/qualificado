"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 min-w-70 max-w-sm
        ${isSuccess
          ? "bg-zinc-900/60 border-l-green-400"
          : "bg-zinc-900/60 border-l-red-400"
        }
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {isSuccess
        ? <CheckCircle size={20} className="text-green-400 shrink-0" />
        : <XCircle size={20} className="text-red-400 shrink-0" />
      }
      <span className="text-sm flex-1 font-mono tracking-tight text-zinc-100">
        {toast.message}
      </span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0 ml-1"
      >
        <X size={16} />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${isSuccess ? "bg-green-400/60" : "bg-red-400/60"}`}
        style={{ animation: "shrink 3s linear forwards" }}
      />
    </div>
  );
}
