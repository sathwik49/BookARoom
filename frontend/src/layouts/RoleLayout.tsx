import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function RoleLayout({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const { data } = useAuth();
  const role = data?.details?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
