import { createBrowserRouter } from "react-router-dom";
import Login from "./views/auth/Login";
import UserLayout from "./views/layouts/UserLayout";
import Home from "./views/student/Home";
import AdminLayout from "./views/layouts/AdminLayout";
import Dashboard from "./views/admin/Dashboard";
import Processes from "./views/admin/Processes";
import Students from "./views/admin/Students";
import Admin from "./views/admin/Admin";
import Reports from "./views/admin/Reports";
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
        path: "/admin/processes",
        element: <Processes />,
      },
      {
        path: "/admin/students",
        element: <Students />,
      },
      {
        path: "/admin/enginiers",
        element: <Enginiers />,
      },
      {
        path: "/admin/admins",
        element: <Admin />,
      },
      {
        path: "/admin/settings",
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
        path: "/home/my-process",
        element: <MyProcess />,
      },
      {
        path: "/home/my-files",
        element: <Files />,
      },
      {
        path: "/home/settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
