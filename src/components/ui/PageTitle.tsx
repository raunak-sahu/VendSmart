type Props = {
  title: string;
  subtitle?: string;
};

export default function PageTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}