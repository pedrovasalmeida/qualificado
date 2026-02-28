/** Formata dígitos brutos (ex: "31999999999") para exibição: "(31) 99999-9999" */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length === 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Extrai apenas os dígitos para salvar no banco */
export function stripPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}
