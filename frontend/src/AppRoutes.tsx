import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import DashboardIndexPage from "./pages/dashboard/DashboardInderPage";
import BookingsPage from "./pages/bookings/BookingsPage";
import ClassroomsPage from "./pages/classroom/ClassroomsPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardIndexPage /> },
          { path: "classrooms", element: <ClassroomsPage /> },
          { path: "bookings", element: <BookingsPage /> },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
