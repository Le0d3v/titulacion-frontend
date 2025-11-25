import PDFViewer from "../components/PDFViewer";
import Estado from "../components/Estado";
import Alerta from "../components/Alerta";
import { ClipLoader } from "react-spinners";
import { X, CircleCheck } from "lucide-react";

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
}) {
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
                  <ClipLoader size={20} />
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
                  <ClipLoader size={20} />
                ) : (
                  <>
                    <CircleCheck size={17} /> Aprobar
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
