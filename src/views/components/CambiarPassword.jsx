import { Lock, CircleCheck, Save, Eye, EyeOff } from "lucide-react";
import { useState, createRef } from "react";
import clienteAxios from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import Alerta from "./Alerta";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function CambiarPassword() {
  const { user } = useAuth({ middleware: "auth" });
  const token = localStorage.getItem("AUTH_TOKEN");

  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const currentPasswordRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const datos = {
      id: user.id,
      current_password: currentPasswordRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    try {
      const { data } = await clienteAxios.post("/api/change-password", datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      setErrores([]);
      setCargando(false);
      await toast.success(data.message);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      setCargando(false);
      setTimeout(() => {
        setErrores([]);
      }, 5000);
    }
  };

  return (
    <div
      className="border-gray-500 border-2 w-full p-3 rounded-xl mb-5"
      id="cambiar-password"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-500/70">
          <Lock />
        </div>
        <h1 className="text-xl font-bold">Cambiar Contraseña</h1>
      </div>
      <div className="mt-1">
        <form method="post" className="mt-1" onSubmit={handleSubmit}>
          <legend className="text-blue-300 text-center md:text-start flex gap-1 mt-3 items-center">
            <CircleCheck className="h-5 w-5" />
            <p>Modifica tu contraseña llenando el siguiente formulario</p>
          </legend>
          {errores.map((error, i) => (
            <Alerta key={i}>{error}</Alerta>
          ))}
          <div className="mt-5 px-1" id="cambiar-password-input">
            <label htmlFor="" className="font-bold">
              Contraseña Actual
            </label>
            <div className="relative group mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="••••••••"
                required
                name="current_password"
                ref={currentPasswordRef}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                id="ver-password"
              >
                {showPassword ? (
                  <EyeOff className="text-white hover:cursor-pointer" />
                ) : (
                  <Eye className="text-white hover:cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-5 px-1">
            <label htmlFor="" className="font-bold">
              Contraseña Nueva
            </label>
            <div className="relative group mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
              <input
                type={showPassword ? "text" : "password"}
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
          <div className="mt-5 px-1">
            <label htmlFor="" className="font-bold">
              Confirmar Contraseña
            </label>
            <div className="relative group mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="••••••••"
                required
                name="password_confirmation"
                ref={passwordConfirmationRef}
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
          <div className="flex justify-center md:justify-end mt-7 md:mt-5">
            <button
              type="submit"
              className="flex items-center justify-center w-52 gap-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              disabled={cargando}
              id="boton-cambiar-passwor"
            >
              {cargando ? (
                <ClipLoader color="#ffffff" size={24} className="m-0" />
              ) : (
                <>
                  <Save />
                  <p>Guardar Contraseña</p>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
