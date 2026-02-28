import { createClient } from "@supabase/supabase-js";

// Cliente com service role key — bypassa RLS para operações admin
// Usar APENAS em server actions (nunca expor no client)
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
