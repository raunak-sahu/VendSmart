export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border bg-white p-6">

      <div className="h-4 w-28 rounded bg-slate-200" />

      <div className="mt-5 h-8 w-36 rounded bg-slate-300" />

      <div className="mt-8 h-2 w-full rounded bg-slate-100" />

    </div>
  );
}