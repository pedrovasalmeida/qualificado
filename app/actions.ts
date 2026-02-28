"use server";

import { supabase } from "@/lib/supabase";
import { Contact } from "@/components/ContactCard";

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }

  return data as Contact[];
}

export async function createContact(
  contact: Omit<Contact, "id" | "status">
): Promise<{ success: boolean; error?: string }> {
  const digits = contact.phone.replace(/\D/g, "");
  if (digits.length < 10) {
    return { success: false, error: "Número de telefone inválido." };
  }

  const { error } = await supabase.from("contacts").insert({
    name: contact.name,
    service: contact.service,
    summary: contact.summary,
    description: contact.description,
    phone: contact.phone,
    cities: contact.cities,
  });

  if (error) {
    console.error("Error creating contact:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
