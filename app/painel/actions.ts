"use server";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export type ContactStatus = "show" | "hidden";

export interface AdminContact {
  id: string;
  name: string;
  service: string;
  summary: string;
  description: string;
  phone: string;
  cities: string[];
  status: ContactStatus | null;
  created_at: string;
  updated_at: string;
}

export interface GetAdminContactsOptions {
  search?: string;
  orderBy?: "created_at" | "name";
  orderDir?: "asc" | "desc";
}

export async function getAdminContacts(
  options: GetAdminContactsOptions = {},
): Promise<AdminContact[]> {
  const supabase = createSupabaseAdminClient();
  const { search, orderBy = "created_at", orderDir = "desc" } = options;

  let query = supabase
    .from("contacts")
    .select("*")
    .order(orderBy, { ascending: orderDir === "asc" });

  if (search) {
    query = query.or(`name.ilike.%${search}%,service.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching admin contacts:", error);
    return [];
  }

  return (data ?? []) as AdminContact[];
}

export async function getPendingContacts(): Promise<AdminContact[]> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .or("status.is.null")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pending contacts:", error);
    return [];
  }

  return (data ?? []) as AdminContact[];
}

export async function approveContact(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("contacts")
    .update({ status: "show" })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/painel/contatos");
  revalidatePath("/");
  return { success: true };
}

export async function dismissContact(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("contacts")
    .update({ status: "hidden" })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/painel/contatos");
  return { success: true };
}

export async function updateContact(
  id: string,
  data: Partial<Omit<AdminContact, "id" | "created_at">>,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("contacts").update(data).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/painel/contatos");
  revalidatePath("/");
  return { success: true };
}

export async function deleteContact(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/painel/contatos");
  revalidatePath("/");
  return { success: true };
}

export async function bulkDeleteContacts(
  ids: string[],
): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("contacts").delete().in("id", ids);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/painel/contatos");
  revalidatePath("/");
  return { success: true };
}

export async function bulkHideContacts(
  ids: string[],
): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("contacts")
    .update({ status: "hidden" })
    .in("id", ids);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/painel/contatos");
  revalidatePath("/");
  return { success: true };
}
