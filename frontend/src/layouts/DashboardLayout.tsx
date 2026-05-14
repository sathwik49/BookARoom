import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout() {
  const { data, isLoading } = useAuth();
  const user = data?.details;

  if (isLoading)
    return <div className="min-h-screen bg-gray-100 animate-pulse" />;

  return (
    <div className="h-screen bg-gray-100/30 flex overflow-hidden">
      <Sidebar
        role={user?.role ?? ""}
        name={user?.name ?? ""}
        avatar={user?.avatar ?? ""}
      />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
