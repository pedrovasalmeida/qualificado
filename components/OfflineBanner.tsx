"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 py-3 text-sm text-zinc-300"
      style={{
        background: "rgba(13, 13, 11, 0.90)",
        backdropFilter: "blur(6.3px)",
        WebkitBackdropFilter: "blur(6.3px)",
        borderTop: "1px solid rgb(63, 63, 70)",
      }}
      role="status"
      aria-live="polite"
    >
      <WifiOff size={16} className="text-yellow-400 shrink-0" />
      <span>Você está offline. Exibindo dados salvos do catálogo.</span>
    </div>
  );
}
