"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full md:w-80
        rounded-xl border px-4 py-2
        bg-white dark:bg-slate-900
        border-slate-200 dark:border-slate-800
        text-slate-900 dark:text-white
        placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition
      "
    />
  );
}