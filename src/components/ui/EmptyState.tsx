type Props = {
  message: string;
};

export default function EmptyState({
  message,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed p-10 text-center text-slate-500">
      {message}
    </div>
  );
}