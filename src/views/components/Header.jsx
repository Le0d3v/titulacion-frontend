import { School, Menu, Bell, LogOut, Video } from "lucide-react";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { useAuth } from "../../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useAdminTour } from "../../hooks/useAdminTour";

export default function Header({ index }) {
  const { layoutTour } = useAdminTour();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth({ middleware: "auth" });
  const [cargando, setCargando] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setCargando(true);
    await logout();
    setCargando(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100" id="header">
        <div className="flex items-center justify-between h-16 px-6 flex-1">
          <div className="flex items-center justify-between md:w-auto w-full">
            <div className="flex gap-2 items-center">
              <div className="p-2 rounded-full bg-emerald-400 text-white hidden md:block">
                <School />
              </div>
              <div className="block md:hidden">
                <img src="/img/logo.png" alt="imagen-logo" className="w-22" />
              </div>
              <h1 className="text-md md:text-xl text-gray-900">
                Universidad Tecnológica de Huejotzingo
              </h1>
            </div>
            <div>
              <button
                className="md:hidden text-gray-500 hover:text-gray-700 mr-4 hover:cursor-pointer"
                onClick={toggleMenu}
              >
                <Menu className="w-10 h-10" />
              </button>
            </div>
          </div>
          <div className="md:flex items-center space-x-8 hidden">
            <div className="flex gap-5 items-center">
              <button
                className="relative text-white bg-blue-400 hover:bg-blue-500 hover:cursor-pointer p-1 flex gap-1 hover:-translate-y-1 transition rounded text-sm items-center"
                id="tutorial-layout"
                onClick={() => {
                  layoutTour().drive();
                }}
              >
                <Video className="w-5 h-5" />
                <p>Tutorial</p>
              </button>
              <button className="relative text-gray-500 hover:text-black transition-colors cursor-pointer">
                <Bell className="w-6 h-6 transition hover:-translate-y-1" />
              </button>
            </div>
            <div className="flex items-center">
              <button
                className="flex items-center justify-center gap-1 text-sm bg-emerald-500 rounded-lg text-white font-bold hover:bg-emerald-600 p-2 transition hover:-translate-y-1 cursor-pointer w-36"
                onClick={handleLogout}
                disabled={cargando}
                id="boton-cerrar-sesion"
              >
                {cargando ? (
                  <ClipLoader color="#ffffff" size={20} className="m-0" />
                ) : (
                  <>
                    <p>Cerrar Sesión</p>
                    <LogOut className="w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Renderiza ResponsiveMenu fuera del botón */}
      <ResponsiveMenu isOpen={isMenuOpen} closeMenu={closeMenu} index={index} />
    </>
  );
}
