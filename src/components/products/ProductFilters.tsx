"use client";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
};

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3">

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="
          w-full md:w-80 rounded-xl border px-4 py-2
          bg-white dark:bg-slate-900
          border-slate-200 dark:border-slate-800
          text-slate-900 dark:text-white
          focus:ring-2 focus:ring-indigo-500 outline-none
        "
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          rounded-xl border px-3 py-2
          bg-white dark:bg-slate-900
          border-slate-200 dark:border-slate-800
          text-slate-900 dark:text-white
        "
      >
        <option value="all">All</option>
        <option value="Food">Food</option>
        <option value="Drinks">Drinks</option>
        <option value="Electronics">Electronics</option>
      </select>

    </div>
  );
}