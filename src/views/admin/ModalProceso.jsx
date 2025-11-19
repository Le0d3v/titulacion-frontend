import { X } from "lucide-react";
import BarraProgreso from "../components/BarraProgreso";

export default function ModalProceso({ open, onClose, proceso }) {
  if (!open || !proceso) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-7xl p-6 rounded-xl shadow-xl text-black 
             max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-3xl font-bold mb-3 text-emerald-400 text-center">
          Detalles del Proceso (
          {proceso.name +
            " " +
            proceso.apellido_paterno +
            " " +
            proceso.apellido_materno}
          )
        </h2>

        <BarraProgreso proceso={proceso.proceso} />

        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                  hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
          >
            <X size={18} /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
