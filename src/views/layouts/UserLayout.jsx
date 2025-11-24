import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import { User } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";

export default function UserLayout() {
  const { user } = useAuth({ middleware: "auth" });
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  return (
    <div className="h-screen flex">
      <div className="fixed bg-emerald-500 inset-y-0 left-0 z-50 w-16 lg:w-44 dark:bg-gray-900 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 text-white hidden md:block">
        <div className="flex items-center justify-center lg:justify-start h-16 px-4 border-b border-gray-800 w-full">
          <div className="w-22 h-22 flex items-center justify-center">
            <img
              src={mediaQuery ? "/img/logo_dark.png" : "/img/logo.png"}
              className="w-40 dark:block hidden mx-auto"
              alt="imagen-logo"
            />
            <img
              src={mediaQuery ? "/img/logo.png" : "/img/logo_dark.png"}
              className="w-40 block dark:hidden mx-auto"
              alt="imagen-logo"
            />
          </div>
        </div>
        <Navigation index="0" />
        <div className="absolute bottom-5 left-2 right-2">
          <div className="flex items-center justify-center lg:justify-start p-3 rounded-lg">
            <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="ml-3 hidden lg:block">
              <p className="text-xs text-white dark:text-gray-300">
                {user ? (
                  <p className="text-xs">
                    {user.name + " " + user.apellido_paterno}
                  </p>
                ) : (
                  <p className="text-xs">Usuario no autenticado</p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header index="0" />
        <main className=" text-black flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 p-2 md:p-5 max-w-auto">
          <div className="bg-white text-black dark:bg-white/10 dark:text-white h-full rounded-2xl p-1 md:p-5 max-w-auto md:ml-16 lg:ml-0 overflow-y-scroll">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
