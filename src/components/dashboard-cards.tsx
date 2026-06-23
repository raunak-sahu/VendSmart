import{
    Package,TrendingUp,IndianRupee,Users
} from "lucide-react";
const cards=[
    {
        title:"Revenue",
       value: "₹4,50,000",
    change: "+18%",
    icon:IndianRupee,
    },
    {
        title:"Profit",
            value: "₹1,20,000",
    change: "+12%",
    icon:TrendingUp,
    },
      {
    title: "Products",
    value: "253",
    change: "+8%",
    icon: Package,
  },
    {
        title:"Vendors",
     value: "18",
    change: "+3%",
    icon: Users,
    },
];
export default function DashboardCards()
{
    return(
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card)=>(
                <div
                key={card.title}
                className="group rounded-3xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-xl
                hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <card.icon className="h-8 w-8 text-indigo-600"/>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                            {card.change}
                        </span>
                    </div>
                    <h3 className="mt-6 text-slate-500">
                        {card.title}
                    </h3>
                    <p className="mt-2 text-4xl font-bold tracking-tight">
                        {card.value}
                    </p>
                    </div>
            ))}
        </div>
    )
}