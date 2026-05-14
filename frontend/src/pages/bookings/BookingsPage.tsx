import AdminBookings from "@/components/admin/AdminBookings";
import StudentBookings from "@/components/students/StudentBookings";
import { useAuth } from "@/hooks/useAuth";

export default function BookingsPage() {
  const { data } = useAuth();
  const role = data?.details?.role;

  if (["ADMIN", "INCHARGE"].includes(role ?? "")) return <AdminBookings />;
  return <StudentBookings />;
}
