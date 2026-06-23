"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="all">All</option>
      <option value="Food">Food</option>
      <option value="Drinks">Drinks</option>
    </select>
  );
}