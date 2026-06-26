"use client";

import {
  useEffect,
  useState,
} from "react";
import { Search } from "lucide-react";

export default function GlobalSearch() {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<any>(null);

  useEffect(() => {
    if (!query) return;

    fetch(
      `/api/search?q=${query}`
    )
      .then((res) => res.json())
      .then(setResults);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl">

      <div className="flex items-center rounded-2xl border bg-white px-4 py-3">

        <Search className="h-5 w-5 text-slate-400" />

        <input
          placeholder="Search products, vendors, invoices..."
          className="ml-3 w-full outline-none"
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
        />

      </div>

      {results && query && (
        <div className="absolute mt-2 w-full rounded-2xl border bg-white shadow-xl z-50">

          {results.products?.map(
            (p: any) => (
              <div
                key={p.id}
                className="border-b p-3"
              >
                📦 {p.productName}
              </div>
            )
          )}

          {results.vendors?.map(
            (v: any) => (
              <div
                key={v.id}
                className="border-b p-3"
              >
                🏢 {v.vendorName}
              </div>
            )
          )}

          {results.sales?.map(
            (s: any) => (
              <div
                key={s.id}
                className="p-3"
              >
                🧾 {s.invoiceNumber}
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}