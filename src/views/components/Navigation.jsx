import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Home,
  FileText,
  BarChart3,
  User,
  ShieldUser,
  Settings,
  GraduationCap,
  HardHat,
} from "lucide-react";

export default function Navigation({ index }) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <nav className="mt-5 px-2">
      <div className="hidden lg:block">
        <p className="text-sm text-white dark:text-gray-400 text-center my-2 transition-colors">
          Navegación
        </p>
      </div>

      {index == 1 ? (
        <>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <Home className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Inicio
            </span>
          </NavLink>

          <NavLink
            to="/admin/processes"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <FileText className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Procesos
            </span>
          </NavLink>

          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <User className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              TSU
            </span>
          </NavLink>

          <NavLink
            to="/admin/enginiers"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <HardHat className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Ingenierías
            </span>
          </NavLink>

          <NavLink
            to="/admin/admins"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <ShieldUser className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Admins
            </span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <Settings className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Configuración
            </span>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <Home className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Inicio
            </span>
          </NavLink>

          <NavLink
            to="/home/my-process"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <GraduationCap className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Mi Proceso
            </span>
          </NavLink>

          <NavLink
            to="/home/my-files"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <FileText className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Mis Archivos
            </span>
          </NavLink>

          <NavLink
            to="/home/settings"
            className={({ isActive }) =>
              `flex items-center p-5 md:p-3 mb-1 rounded-lg gap-1 transition-all duration-200 group 
           text-wite dark:text-white text-sm
          ${
            isActive
              ? "bg-gray-800 dark:bg-emerald-500/30 border-l-4 border-white font-black text-white dark:text-white"
              : "hover:-translate-y-1"
          }`
            }
          >
            <Settings className="w-6 h-6 lg:mr-3" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
              Configuración
            </span>
          </NavLink>
        </>
      )}
    </nav>
  );
}
