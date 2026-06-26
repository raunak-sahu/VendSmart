import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

export default function SearchInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search..."
        className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-indigo-500"
      />
    </div>
  );
}