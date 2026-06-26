const activities = [
  {
    title: "New Product Added",
    desc: "Pepsi 2L",
    time: "10 mins ago",
  },
  {
    title: "Stock Updated",
    desc: "Maggi +50 units",
    time: "25 mins ago",
  },
  {
    title: "Vendor Added",
    desc: "ABC Distributors",
    time: "1 hour ago",
  },
  {
    title: "Purchase Bill Created",
    desc: "₹25,000",
    time: "2 hours ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-xl font-semibold">
        Activity Timeline
      </h2>

      <div className="mt-8">

        {activities.map((item, index) => (
          <div
            key={index}
            className="relative pl-8 pb-8"
          >

            <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-indigo-600" />

            {index !== activities.length - 1 && (
              <div className="absolute left-[5px] top-5 h-full w-[2px] bg-slate-200 dark:bg-slate-700" />
            )}

            <h3 className="font-medium">
              {item.title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 dark:text-slate-400">
              {item.desc}
            </p>

            <span className="text-xs text-slate-400">
              {item.time}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}