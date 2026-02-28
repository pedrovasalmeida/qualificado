import { getAdminContacts, getPendingContacts } from "@/app/painel/actions";
import ContactsClient from "@/components/admin/ContactsClient";

export const metadata = {
  title: "Contatos | Painel",
};

export default async function ContatosPage() {
  const [pending, all] = await Promise.all([
    getPendingContacts(),
    getAdminContacts(),
  ]);

  return <ContactsClient initialPending={pending} initialContacts={all} />;
}
