import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
<header className="sticky top-0 z-50 
bg-white/80
backdrop-blur-xl  border-b border-slate-200">
    <div className="flex items-center justify-between px-8 py-5">
        <div> 
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>
              <p className="text-slate-500">
            Welcome back, Raunak 👋
          </p>
        </div>

        <div className="flex items-center gap-5">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2
                h-4
                w-4 text-slate-400"/>
                <input
                placeholder="Search..."
                className="rounded-2xl border bg-slate-50 pl-10 pr-4 py-3 outline-none"/>

            </div>
            <button className="rounded-2xl border p-3">
                <Bell className="h-5 w-5"/>
            </button>
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"/>
            
        </div>
    </div>
</header>
      
  );
}