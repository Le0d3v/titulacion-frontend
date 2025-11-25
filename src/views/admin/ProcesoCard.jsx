import PDFViewer from "../components/PDFViewer";
import Estado from "../components/Estado";
import Alerta from "../components/Alerta";
import { ClipLoader } from "react-spinners";
import { X, CircleCheck, Send } from "lucide-react";
import { createRef } from "react";
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";

export default function ProcesoCard({
  title,
  estado,
  archivo,
  fileType,
  filePath,
  baseUrl,
  loadingApprove,
  loadingReject,
  onApprove,
  onReject,
  subproceso,
  comentarioLoading,
  setComentarioLoading,
  proceso_id,
}) {
  const token = localStorage.getItem("AUTH_TOKEN");
  const comentarioRef = createRef();

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    setComentarioLoading(true);

    const datos = {
      proceso_id: proceso_id,
      subproceso: subproceso,
      comentario: comentarioRef.current.value,
    };

    try {
      const { data } = await clienteAxios.post("/api/comentario/store", datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setComentarioLoading(false);
    }
  };

  return (
    <div
      className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
    hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
    >
      <h2 className="text-center text-emerald-500 font-bold text-2xl">
        {title}
      </h2>

      <div className="my-2 flex gap-1 items-center">
        <p>Estado: </p>
        <Estado estado={estado} />
      </div>
      {!archivo ? (
        <Alerta>No hay archivo adjuntado</Alerta>
      ) : (
        <>
          <p className="my-3 text-gray-600">Archivo Adjunto:</p>
          {fileType === "pdf" && (
            <PDFViewer url={baseUrl + filePath + archivo} />
          )}
          {fileType === "image" && (
            <img
              src={baseUrl + filePath + archivo}
              className="w-full h-72 rounded-md object-cover shadow"
            />
          )}
          {fileType === "text" && (
            <p className="p-2 rounded bg-emerald-400 text-white font-bold">
              {archivo}
            </p>
          )}
          <h2 className="text-center text-blue-400 font-bold mt-5">Acciones</h2>
          <div className="flex justify-center mt-3">
            <div className="flex gap-2">
              <button
                onClick={onReject}
                disabled={loadingReject}
                className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
              >
                {loadingReject ? (
                  <ClipLoader size={20} className="text-white" />
                ) : (
                  <>
                    <X size={17} /> Rechazar
                  </>
                )}
              </button>
              <button
                onClick={onApprove}
                disabled={loadingApprove}
                className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
              >
                {loadingApprove ? (
                  <ClipLoader size={20} className="text-white" />
                ) : (
                  <>
                    <CircleCheck size={17} /> Aprobar
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <form
              onSubmit={handleSubmitComentario}
              className="p-3 rounded shadow-xl"
            >
              <legend className="text-lg text-emerald-400 font-bold">
                Redacta un comentario
              </legend>
              <div className="w-full mt-3">
                <label
                  htmlFor="comentario"
                  className="text-sm text-gray-500 font-bold"
                >
                  Comentario:
                </label>
                <textarea
                  name="comentario"
                  id="comentario"
                  className="p-2 w-full bg-gray-200 border-2 rounded border-gray-500 text-black mt-1"
                  ref={comentarioRef}
                ></textarea>
              </div>
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={comentarioLoading}
                  className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer
          hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
                >
                  {comentarioLoading ? (
                    <ClipLoader color="#ffffff" size={24} />
                  ) : (
                    <>
                      <Send size={18} /> Enviar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
