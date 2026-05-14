import { School, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PageHeader from "@/components/dashboard/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/axios";
import { getAdminStatsQuery } from "@/api/api";

export default function AdminDashboard() {
  const { data } = useQuery({
    queryKey: queryKeys.USER.GET_STATS,
    queryFn: getAdminStatsQuery,
  });

  const stats = data?.details;
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage classrooms, schedules and bookings"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Classrooms"
          value={stats?.totalClassrooms ?? 0}
          icon={School}
        />

        <StatsCard
          title="Active Users"
          value={stats?.totalUsers || 0}
          icon={Users}
        />
      </div>
    </div>
  );
}
