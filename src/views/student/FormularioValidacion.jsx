import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import clienteAxios from "../../config/axios";
import Alerta from "../components/Alerta";
import { toast } from "react-toastify";
import { createRef } from "react";

export default function FormularioValidacion({ open, onClose, user, token }) {
  const [cargandoValidacion, setCargandoValidacion] = useState(false);
  const [erroresValidacion, setErroresValidacion] = useState([]);

  const comentarioRef = createRef();

  if (!open) return null;

  const handleSubmitValidacion = async (e) => {
    e.preventDefault();
    setCargandoValidacion(true);

    const datos = {
      id: user.id,
      comentario: comentarioRef.current.value,
    };

    try {
      const { data } = await clienteAxios.post(
        "https://servidor-externo.com/api/validar-datos",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setErroresValidacion([]);
      setCargandoValidacion(false);
      toast.success(data.message);
      onClose();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErroresValidacion(Object.values(error.response.data.errors));
      } else {
        setErroresValidacion(["No se pudo conectar con el servidor externo"]);
      }

      setTimeout(() => setErroresValidacion([]), 5000);
      setCargandoValidacion(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-emerald-600 mb-4">
          Validar Datos Personales
        </h2>

        {erroresValidacion.length > 0 &&
          erroresValidacion.map((err, i) => <Alerta key={i}>{err}</Alerta>)}

        <form onSubmit={handleSubmitValidacion} className="space-y-3">
          <div>
            <label className="font-semibold text-gray-700">Comentario:</label>
            <textarea
              ref={comentarioRef}
              rows="3"
              required
              className="w-full border rounded p-2 mt-1 bg-gray-50 focus:border-blue-600 focus:ring-blue-600"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={cargandoValidacion}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              {cargandoValidacion ? (
                <ClipLoader color="#ffffff" size={18} />
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
