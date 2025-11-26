// router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/auth/Login";
import UserLayout from "./views/layouts/UserLayout";
import Home from "./views/student/Home";
import AdminLayout from "./views/layouts/AdminLayout";
import Dashboard from "./views/admin/Dashboard";
import Processes from "./views/admin/Processes";
import Students from "./views/admin/Students";
import Admin from "./views/admin/Admin";
import Setings from "./views/admin/Setings";
import MyProcess from "./views/student/MyProcess";
import Files from "./views/student/Files";
import Settings from "./views/student/Settings";
import Enginiers from "./views/admin/Enginiers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "processes",
        element: <Processes />,
      },
      {
        path: "processes/:proceso",
        element: <Processes />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "enginiers",
        element: <Enginiers />,
      },
      {
        path: "admins",
        element: <Admin />,
      },
      {
        path: "settings",
        element: <Setings />,
      },
    ],
  },
  {
    path: "/home",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "my-process",
        element: <MyProcess />,
      },
      {
        path: "my-files",
        element: <Files />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
