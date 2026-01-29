import { Sidebar } from "@/components/shared/dashboard/Sidebar";
import { Topbar } from "@/components/shared/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#111111] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-linear-to-br from-black via-[#0A0A0A] to-black">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
