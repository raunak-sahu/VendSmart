export default function BusinessInsights() {
  const insights = [
    "Maggi is your top-selling product.",
    "Three products are below reorder threshold.",
    "Revenue increased by 18% compared to last month.",
    "Five products are nearing expiry.",
  ];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Business Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-slate-50 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}