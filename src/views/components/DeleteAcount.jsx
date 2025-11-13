import { Trash, Lock, CircleAlert } from "lucide-react";
import { useState } from "react";

export default function DeleteAcount() {
  const [button, setButton] = useState(false);

  return (
    <div className="border-gray-500 border-2 w-full p-3 rounded-xl mb-5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-500/70">
          <Trash />
        </div>
        <h1 className="text-xl font-bold">Eliminar Cuenta</h1>
      </div>
      <div className="mt-2">
        <div className="flex gap-1 md:items-center">
          <CircleAlert className="text-yellow-400 md:h-5 md:w-5 h-13 w-13" />
          <p className="text-center md:text-start text-yellow-400">
            Para eliminar tu cuentes debes confirmar tu identidad colocando tu
            contraseña
          </p>
        </div>
        <p className="text-center md:text-start mt-3">
          Al eliminar la cuenta se eliminarán todos los datos relacionados con
          ella (Credenciales de Inicio de Sesión, Datos Personales, etc.).
        </p>
        <div className="mt-5 w-full">
          <form className="">
            <div className="mt-5 px-1 w-full">
              <label htmlFor="" className="font-bold">
                Contraseña
              </label>
              <div className="relative group mt-2 w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="••••••••"
                  required
                  name="password"
                />
              </div>
            </div>
            <div className="mt-5 px-1 w-full">
              <label htmlFor="" className="font-bold">
                Confirma tu Contraseña
              </label>
              <div className="relative group mt-2 w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors text-white" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="••••••••"
                  required
                  name="password"
                />
              </div>
            </div>
            <div className="flex justify-center md:justify-end mt-7 md:mt-5">
              <button
                type="submit"
                className="flex gap-1 items-center p-2 bg-red-500 font-bold text-white rounded hover:cursor-pointer hover:bg-red-700 transition hover:-translate-y-1"
              >
                <Trash />
                <p>Eliminar Cuenta</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
