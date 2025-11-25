import { X } from "lucide-react";
import BarraProgreso from "../components/BarraProgreso";
import { useState } from "react";
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";
import ProcesoCard from "./ProcesoCard";
import Estado from "../components/Estado";

export default function ModalProceso({ open, onClose, procesoId, procesos }) {
  if (!open || !procesoId || !procesos) return null;

  const proceso = procesos.find((p) => p.id === procesoId);

  if (!proceso) return null;

  const token = localStorage.getItem("AUTH_TOKEN");

  const [memoriaAceptarLoading, setMemoriaAceptarLoading] = useState(false);
  const [memoriaRechazarLoading, setMemoriaRechazarLoading] = useState(false);

  const [comprobanteAceptarLoading, setComprobanteAceptarLoading] =
    useState(false);
  const [comprobanteRechazarLoading, setComprobanteRechazarLoading] =
    useState(false);

  const [imagenAceptarLoading, setImagenAceptarLoading] = useState(false);
  const [imagenRechazarLoading, setImagenRechazarLoading] = useState(false);

  const [referenciaAceptarLoading, setReferenciaAceptarLoading] =
    useState(false);
  const [referenciaRechazarLoading, setReferenciaRechazarLoading] =
    useState(false);

  const [comentarioMemoriaLoading, setComentarioMemoriaLoading] =
    useState(false);
  const [comentarioComprobanteLoading, setComentarioComprobanteLoading] =
    useState(false);
  const [comentarioImagenLoading, setComentarioImagenLoading] = useState(false);
  const [comentarioReferenciaLoading, setComentarioReferenciaLoading] =
    useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmitProceso = async (e, type, action, setLoading) => {
    e.preventDefault();
    setLoading(true);

    const datos = { id: proceso.id };

    try {
      const { data } = await clienteAxios.post(
        `/api/proceso/${type}/${action}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-3">
      <div className="bg-white w-full max-w-7xl p-6 rounded-xl shadow-xl text-black max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-black mb-3 text-emerald-400 text-center">
          Detalles del Proceso (
          {proceso.name +
            " " +
            proceso.apellido_paterno +
            " " +
            proceso.apellido_materno}
          )
        </h2>

        <BarraProgreso proceso={proceso.proceso} />

        <div className="mt-5 w-full">
          <h2 className="text-center my-3 text-emerald-400 font-bold text-xl">
            Actividades:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProcesoCard
              title="Validación de Memoria de Estadía"
              estado={proceso.proceso.validacion_memoria_estadia}
              archivo={proceso.archivo?.memoria_estadia}
              fileType="pdf"
              filePath="/storage/pdfs/memorias/"
              baseUrl={baseURL}
              loadingApprove={memoriaAceptarLoading}
              loadingReject={memoriaRechazarLoading}
              onApprove={(e) =>
                handleSubmitProceso(
                  e,
                  "memoria",
                  "aprobar",
                  setMemoriaAceptarLoading
                )
              }
              onReject={(e) =>
                handleSubmitProceso(
                  e,
                  "memoria",
                  "rechazar",
                  setMemoriaRechazarLoading
                )
              }
              subproceso={"memoria"}
              comentarioLoading={comentarioMemoriaLoading}
              setComentarioLoading={setComentarioMemoriaLoading}
              proceso_id={proceso.id}
            />

            <div
              className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
            hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
            >
              <h2 className="text-center text-emerald-500 font-bold text-2xl">
                Validación de Datos Personales (Estudiante)
              </h2>

              <div className="my-2 flex gap-1 items-center">
                <p>Estado: </p>
                <Estado estado={proceso.proceso.validacion_datos_personales} />
              </div>
            </div>
            <div
              className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
            hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
            >
              <h2 className="text-center text-emerald-500 font-bold text-2xl">
                Realización de Encuesta de Egresados
              </h2>

              <div className="my-2 flex gap-1 items-center">
                <p>Estado: </p>
                <Estado estado={proceso.proceso.encuesta_egresados} />
              </div>
            </div>

            <ProcesoCard
              title="Comprobante de Pago por Donación de Inmobiliaria"
              estado={proceso.proceso.pago_donacion}
              archivo={proceso.archivo?.comprobante_donacion}
              fileType="pdf"
              filePath="/storage/pdfs/comprobantes/"
              baseUrl={baseURL}
              loadingApprove={comprobanteAceptarLoading}
              loadingReject={comprobanteRechazarLoading}
              onApprove={(e) =>
                handleSubmitProceso(
                  e,
                  "comprobante",
                  "aprobar",
                  setComprobanteAceptarLoading
                )
              }
              onReject={(e) =>
                handleSubmitProceso(
                  e,
                  "comprobante",
                  "rechazar",
                  setComprobanteRechazarLoading
                )
              }
              subproceso={"comprobante"}
              comentarioLoading={comentarioComprobanteLoading}
              setComentarioLoading={setComentarioComprobanteLoading}
              proceso_id={proceso.id}
            />

            <ProcesoCard
              title="Carga de Imagen para Titulo Universitario"
              estado={proceso.proceso.carga_imagen}
              archivo={proceso.archivo?.imagen_titulacion}
              fileType="image"
              filePath="/storage/imagenes/"
              baseUrl={baseURL}
              loadingApprove={imagenAceptarLoading}
              loadingReject={imagenRechazarLoading}
              onApprove={(e) =>
                handleSubmitProceso(
                  e,
                  "imagen",
                  "aprobar",
                  setImagenAceptarLoading
                )
              }
              onReject={(e) =>
                handleSubmitProceso(
                  e,
                  "imagen",
                  "rechazar",
                  setImagenRechazarLoading
                )
              }
              subproceso={"imagen"}
              comentarioLoading={comentarioImagenLoading}
              setComentarioLoading={setComentarioImagenLoading}
              proceso_id={proceso.id}
            />

            <ProcesoCard
              title="Registro de Referencia de Pago por Titulo Universitario"
              estado={proceso.proceso.pago_titulo}
              archivo={proceso.archivo?.referencia_pago}
              fileType="text"
              baseUrl={baseURL}
              loadingApprove={referenciaAceptarLoading}
              loadingReject={referenciaRechazarLoading}
              onApprove={(e) =>
                handleSubmitProceso(
                  e,
                  "referencia",
                  "aprobar",
                  setReferenciaAceptarLoading
                )
              }
              onReject={(e) =>
                handleSubmitProceso(
                  e,
                  "referencia",
                  "rechazar",
                  setReferenciaRechazarLoading
                )
              }
              subproceso={"referencia"}
              comentarioLoading={comentarioReferenciaLoading}
              setComentarioLoading={setComentarioReferenciaLoading}
              proceso_id={proceso.id}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
          >
            <X size={18} /> Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
