import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import { Contact } from "@/components/ContactCard";

export const getContactsCached = unstable_cache(
  async (): Promise<Contact[]> => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("status", "show")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }

    return data as Contact[];
  },
  ["contacts-catalog"],
  { tags: ["contacts"], revalidate: 60 * 60 * 6 },
);
