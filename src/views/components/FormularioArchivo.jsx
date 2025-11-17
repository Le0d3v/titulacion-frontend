import { ClipLoader } from "react-spinners";
import { Send } from "lucide-react";
import Alerta from "./Alerta";

export default function FormularioArchivo({
  label,
  accept,
  loading,
  errors,
  onSubmit,
  inputRef,
}) {
  return (
    <form
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className="w-full max-w-md mx-auto space-y-4 p-4 bg-gray-200 mt-3 shadow-md rounded-xl"
    >
      {errors.map((e, i) => (
        <Alerta key={i}>{e}</Alerta>
      ))}

      <label className="block text-gray-700 font-semibold">{label}</label>

      <input
        type="file"
        accept={accept}
        ref={inputRef}
        required
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0 file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white hover:file:bg-blue-700
          cursor-pointer bg-gray-50 border border-gray-300 rounded-lg p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer
          hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
      >
        {loading ? (
          <ClipLoader color="#ffffff" size={24} />
        ) : (
          <>
            <Send size={18} /> Enviar
          </>
        )}
      </button>
    </form>
  );
}
