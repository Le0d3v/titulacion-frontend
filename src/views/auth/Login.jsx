import { User, Lock, Eye, EyeOff } from "lucide-react";
import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";

export default function Login() {
  const matriculaRef = createRef();
  const passwordRef = createRef();
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
    setCargando(true);

    const datos = {
      matricula: matriculaRef.current.value,
      password: passwordRef.current.value,
    };

    await login(datos, setErrores, setCargando);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-emerald-100 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-emerald-900 dark:to-gray-900 flex items-center justify-center p-5 transition-colors">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <div className="mx-auto flex items-center justify-center">
            <img src="/img/logo_dark.png" className="w-40 dark:block hidden" />
            <img src="/img/logo.png" className="w-40 block dark:hidden" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 w-full transition-colors">
            Universidad Tecnológica de Huejotzingo
          </h1>

          <p className="text-gray-700 dark:text-green-200 transition-colors">
            Iniciar Sesión
          </p>
        </div>
        <div className="bg-white/10 dark:bg-white/10 dark:backdrop-blur-md rounded-2xl p-8 border border-gray-300 dark:border-white/20 shadow-xl transition-colors">
          <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {errores.map((error, i) => (
              <Alerta key={i}>{error}</Alerta>
            ))}
            <div>
              <label className="block text-gray-900 dark:text-white text-sm font-medium mb-3">
                Matrícula
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white transition-colors" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Ej: 3522110000"
                  required
                  name="matricula"
                  ref={matriculaRef}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-900 dark:text-white text-sm font-medium mb-3">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-white transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="••••••••"
                  required
                  name="password"
                  ref={passwordRef}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-900 dark:text-white" />
                  ) : (
                    <Eye className="text-gray-900 dark:text-white" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
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
          <p className="text-gray-600 dark:text-green-200 text-sm">
            Sistema Institucional Integral UTH © 2025
          </p>
        </div>
      </div>
    </div>
  );
}
