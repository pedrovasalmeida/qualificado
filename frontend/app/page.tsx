import SearchHeader from "@/components/SearchHeader";
import CityFilters from "@/components/CityFilters";
import ContactCard, { Contact } from "@/components/ContactCard";
import ScrollToTop from "@/components/ScrollToTop";
import RegistrationBanner from "@/components/RegistrationBanner";

// Mock data for demonstration
const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Contato número 1",
    service: "Serviço prestado",
    phone: "(11) 9 1234-5678",
    cities: ["Cidade 1", "Cidade 2", "Cidade 3", "Cidade 4"],
  },
  {
    id: 2,
    name: "Contato número 2",
    service: "Serviço prestado",
    phone: "(11) 9 1234-5678",
    cities: ["Cidade 1", "Cidade 2", "Cidade 3", "Cidade 4"],
  },
  {
    id: 3,
    name: "Contato número 3",
    service: "Serviço prestado",
    phone: "(11) 9 1234-5678",
    cities: ["Cidade 1", "Cidade 2", "Cidade 3", "Cidade 4"],
  },
  {
    id: 4,
    name: "Maria Silva",
    service: "Consultoria de Marketing Digital",
    phone: "(21) 9 8765-4321",
    cities: ["Cidade 2", "Cidade 3"],
  },
  {
    id: 5,
    name: "João Santos",
    service: "Desenvolvimento de Software",
    phone: "(11) 9 5555-6666",
    cities: ["Cidade 1", "Cidade 4"],
  },
];

const CITIES = ["Cidade 1", "Cidade 2", "Cidade 3", "Cidade 4", "Cidade 5"];

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-linear-to-b from-blue-50 to-white">
      {/* Registration Banner */}
      <RegistrationBanner />

      <div className="mx-auto w-full max-w-2xl flex flex-col h-full">
        {/* Fixed Header Section */}
        <div className="shrink-0 bg-linear-to-b from-blue-50 to-transparent">
          {/* Search Header */}
          <SearchHeader />

          {/* City Filters */}
          <CityFilters cities={CITIES} />

          {/* Sorting Info */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-600">Ordenado por</span>
            <span className="text-sm font-semibold text-blue-900">Nome</span>
          </div>
        </div>

        {/* Scrollable Contact List */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <div className="space-y-4">
            {MOCK_CONTACTS.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
