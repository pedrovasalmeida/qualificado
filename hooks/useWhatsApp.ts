"use client";

export function useWhatsApp() {
  const openWhatsApp = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${digits}`, "_blank");
  };

  return { openWhatsApp };
}
