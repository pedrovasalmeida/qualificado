import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchHeader() {
  return (
    <div className="flex gap-3 px-4 py-4">
      <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-gray-200">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar contato"
          className="flex-1 border-none bg-transparent text-base outline-none placeholder:text-gray-400"
        />
      </div>
      <button
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200 transition-colors hover:bg-gray-50"
        aria-label="Filtros"
      >
        <SlidersHorizontal className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
}
