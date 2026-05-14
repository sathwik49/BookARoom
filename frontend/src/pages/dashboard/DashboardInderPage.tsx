import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import StudentDashboard from "@/components/students/StudentDashboard";

export default function DashboardIndexPage() {
  const { data } = useAuth();
  const role = data?.details?.role;

  if (["ADMIN", "INCHARGE"].includes(role ?? "")) return <AdminDashboard />;
  return <StudentDashboard />;
}
