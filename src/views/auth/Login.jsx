import { User, Lock, Eye, EyeOff } from "lucide-react"; // Importa Eye y EyeOff
import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import OfflinePage from "./OfflinePage";

export default function Login() {
  const matriculaRef = createRef();
  const passwordRef = createRef();

  const isOnline = useOnlineStatus(() => {
    // cuando vuelve el internet
    console.log("Internet volvió, regresando a login...");
  });

  // si NO hay conexión → offline view
  if (!isOnline) {
    return <OfflinePage />;
  }

  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setCargando(false);
  }, []);

  const { login } = useAuth({
    middleware: "guest",
    url: "home",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!online) return;
    setCargando(true);

    const datos = {
      matricula: matriculaRef.current.value,
      password: passwordRef.current.value,
    };

    await login(datos, setErrores, setCargando);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <div className="mx-auto flex items-center justify-center">
            <img src="../img/logo_dark.png" alt="" className="w-40" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 w-full">
            Universidad Tecnológica de Huejotzingo
          </h1>
          <p className="text-green-200">Iniciar Sesión</p>
        </div>
        {!online && (
          <div className="w-full p-3 bg-red-900/40 text-center rounded mb-4 text-white">
            Sin conexión a internet
          </div>
        )}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {errores.map((error, i) => (
              <Alerta key={i}>{error}</Alerta>
            ))}
            <div>
              <label
                className="block text-white text-sm font-medium mb-3"
                htmlFor="matricula"
              >
                Matrícula
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Ej: 3522110000"
                  required
                  name="matricula"
                  ref={matriculaRef}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-white text-sm font-medium mb-3"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
                <input
                  type={showPassword ? "text" : "password"} // Cambiar tipo basado en estado
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="••••••••"
                  required
                  name="password"
                  ref={passwordRef}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-white hover:cursor-pointer" />
                  ) : (
                    <Eye className="text-white hover:cursor-pointer" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              disabled={cargando}
            >
              {cargando ? (
                <ClipLoader color="#ffffff" size={30} />
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
        </div>
        <div className="text-center py-5">
          <p className="text-green-200 text-sm">
            Sistema Institucional Integral UTH © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
