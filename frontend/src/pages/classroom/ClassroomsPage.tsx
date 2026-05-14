import AdminClassrooms from "@/components/admin/AdminClassrooms";
import StudentClassrooms from "@/components/students/StudentClassrooms";
import { useAuth } from "@/hooks/useAuth";

export default function ClassroomsPage() {
  const { data } = useAuth();
  const role = data?.details?.role;

  if (["ADMIN", "INCHARGE"].includes(role ?? "")) return <AdminClassrooms />;
  return <StudentClassrooms />;
}
