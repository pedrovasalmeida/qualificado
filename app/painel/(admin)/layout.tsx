import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteção de rota feita pelo proxy.ts — aqui apenas buscamos o email
  return (
    <div className="min-h-screen flex">
      <AdminLayoutClient userEmail={user?.email ?? ""}>
        {children}
      </AdminLayoutClient>
    </div>
  );
}
