"use client";

import { useState } from "react";

interface CityFiltersProps {
  cities: string[];
}

export default function CityFilters({ cities }: CityFiltersProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <div className="px-4 py-3">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city === activeCity ? null : city)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeCity === city
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
