import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}