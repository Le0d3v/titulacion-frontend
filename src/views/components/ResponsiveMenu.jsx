import Navigation from "./Navigation";
import { Bell, User, LogOut, Moon, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ResponsiveMenu({ isOpen, closeMenu, index }) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-gray-900 text-white transform transition-transform duration-300 p-3 overflow-y-scroll ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <div>
            <button onClick={closeMenu} className="cursor-pointer">
              <X className=" h-10 w-10" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <img src="/img/logo.png" alt="imagen-logo" className="mx-auto w-32" />
          <h1 className="text-white text-2xl font-bold">
            Universidad Tecnológica de Huejotzingo
          </h1>
        </div>
        <p className="text-lg text-gray-300 mt-10">Navegación</p>
        {index == "1" ? <Navigation index="1" /> : <Navigation index="0" />}
        <div className="flex items-center justify-center lg:justify-start p-3 rounded-lg">
          <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div className="ml-3 sm:block md:hidden lg:block">
            <p className="text-xs text-gray-300">Oscar Rafael</p>
          </div>
        </div>
        <div className="mt-10">
          <NavLink
            to="/"
            className="flex gap-1 text-lg justify-center items-center bg-emerald-500 rounded-lg text-white font-bold hover:bg-emerald-600 p-2 transition hover:-translate-y-1"
          >
            <p>Cerrar Sesión</p>
            <LogOut className="w-10" />
          </NavLink>
        </div>
      </div>
    </>
  );
}
