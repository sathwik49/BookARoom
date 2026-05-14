import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GoogleOAuth from "@/components/GoogleOAuth";
import { CalendarCheckIcon, Hotel, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { AUTH_REDIRECT_URL } from "@/api/axios";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col items-center justify-center px-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-emerald-600 text-white rounded-xl p-3">
          <CalendarCheckIcon className="w-7 h-7" />
        </div>
        <span className="text-3xl font-bold text-emerald-700 tracking-tight">
          BookARoom
        </span>
      </div>

      <h1 className="text-5xl font-extrabold text-gray-900 text-center leading-tight max-w-xl">
        Book rooms <span className="text-emerald-600">instantly</span>,
        hassle-free
      </h1>
      <p className="mt-4 text-lg text-gray-500 text-center max-w-md">
        Reserve college rooms for classes, meetings, or events — with instant
        admin approval tracking.
      </p>
      {!isLoading && isAuthenticated ? (
        <Link
          to={AUTH_REDIRECT_URL}
          className="mt-10 px-8 py-4 text-lg bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg cursor-pointer text-white"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          className="mt-10 px-8 py-6 text-lg bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg cursor-pointer text-white"
        >
          Get Started
        </Button>
      )}

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
        {[
          {
            icon: <Hotel className="text-emerald-600 w-8 h-8" />,
            title: "Browse Rooms",
            desc: "View available rooms with capacity and amenities",
          },
          {
            icon: <CalendarCheckIcon className="text-emerald-600 w-8 h-8" />,
            title: "Pick a Slot",
            desc: "Choose your date and time with conflict detection",
          },
          {
            icon: <ShieldCheck className="text-emerald-600 w-8 h-8" />,
            title: "Get Approved",
            desc: "Admin reviews and approves your request instantly",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 text-center"
          >
            <div className="flex justify-center mb-3">{f.icon}</div>
            <h3 className="font-semibold text-gray-800">{f.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl py-7 px-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Welcome to BookARoom
            </DialogTitle>
            <DialogDescription className="text-center text-emerald-700">
              Sign in to start booking rooms
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <GoogleOAuth setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
