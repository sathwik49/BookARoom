import {
  CalendarDays,
  LayoutDashboard,
  School,
  BookMarked,
  LogOut,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { HOME_URL, queryKeys } from "@/api/axios";
import { logOutMutation } from "@/api/api";
import { handleApiError } from "@/lib/handleApiError";
import { Loader } from "../Loader";

const adminLinks = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Classrooms", icon: School, path: "/dashboard/classrooms" },
  { title: "Bookings", icon: BookMarked, path: "/dashboard/bookings" },
];

const studentLinks = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Classrooms", icon: School, path: "/dashboard/classrooms" },
  { title: "My Bookings", icon: BookMarked, path: "/dashboard/bookings" },
];

interface SidebarProps {
  role: string;
  name: string;
  avatar: string;
}

export default function Sidebar({ role, name, avatar }: SidebarProps) {
  const links = ["ADMIN", "INCHARGE"].includes(role)
    ? adminLinks
    : studentLinks;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: queryKeys.AUTH.LOGOUT,
    mutationFn: logOutMutation,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.AUTH.ME });
      navigate(HOME_URL);
    },
    onError: (err) => handleApiError(err),
  });

  return (
    <aside className="w-64 bg-white border-r border-emerald-100 hidden md:flex flex-col">
      <div className="py-4.75 px-6 border-b border-emerald-100">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white rounded-xl p-2">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h1 className="font-bold text-xl text-emerald-700">BookARoom</h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.title}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer font-medium
                ${isActive ? "bg-emerald-50 text-emerald-700" : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"}`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{link.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-emerald-100 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <img
            src={avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate">
              {name}
            </p>
            <p className="text-xs text-emerald-700 font-medium">{role}</p>
          </div>
        </div>

        <button
          onClick={() => mutate(undefined)}
          disabled={isPending}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition cursor-pointer font-medium disabled:opacity-60"
        >
          {isPending ? (
            <Loader styling="text-red-500" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
