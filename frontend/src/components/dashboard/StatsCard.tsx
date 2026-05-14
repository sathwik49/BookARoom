import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
        </div>

        <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
          <Icon className="w-7 h-7 text-emerald-700" />
        </div>
      </div>
    </div>
  );
}
