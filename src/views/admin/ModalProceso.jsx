import { X, CircleCheck } from "lucide-react";
import BarraProgreso from "../components/BarraProgreso";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import PDFViewer from "../components/PDFViewer";
import Estado from "../components/Estado";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";

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

  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmitAprobarMemoria = async (e) => {
    e.preventDefault();
    setMemoriaAceptarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/memoria/aprobar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMemoriaAceptarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setMemoriaAceptarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitRechazarMemoria = async (e) => {
    e.preventDefault();
    setMemoriaRechazarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/memoria/rechazar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMemoriaRechazarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setMemoriaRechazarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitAprobarComprobante = async (e) => {
    e.preventDefault();
    setComprobanteAceptarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/comprobante/aprobar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComprobanteAceptarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setComprobanteAceptarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitRechazarComprobante = async (e) => {
    e.preventDefault();
    setComprobanteRechazarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/comprobante/rechazar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComprobanteRechazarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setComprobanteRechazarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitAprobarImagen = async (e) => {
    e.preventDefault();
    setImagenAceptarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/imagen/aprobar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImagenAceptarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setImagenAceptarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitRechazarImagen = async (e) => {
    e.preventDefault();
    setImagenRechazarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/imagen/rechazar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImagenRechazarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setImagenRechazarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitAprobarReferencia = async (e) => {
    e.preventDefault();
    setReferenciaAceptarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/referencia/aprobar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReferenciaAceptarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setReferenciaAceptarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  const handleSubmitRechazarReferencia = async (e) => {
    e.preventDefault();
    setReferenciaRechazarLoading(true);

    const datos = {
      id: proceso.id,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/proceso/referencia/rechazar",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReferenciaRechazarLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setReferenciaRechazarLoading(false);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-7xl p-6 rounded-xl shadow-xl text-black 
        max-h-[90vh] overflow-y-auto"
      >
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

          <div className="flex flex-col md:flex-row gap-5 w-full">
            <div
              className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
            hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
            >
              <h2 className="text-center text-emerald-500 font-bold text-2xl">
                Validación de Memoria de Estadía
              </h2>

              <div className="my-2 flex gap-1 items-center">
                <p>Estado: </p>
                <Estado estado={proceso.proceso.validacion_memoria_estadia} />
              </div>

              {proceso?.archivo?.memoria_estadia === null ||
              proceso?.archivo?.memoria_estadia === undefined ? (
                <Alerta>No hay archivo adjuntado</Alerta>
              ) : (
                <>
                  <p className="my-3 text-gray-600">Archivo Adjunto:</p>

                  <PDFViewer
                    url={
                      baseURL +
                      "/storage/pdfs/memorias/" +
                      proceso.archivo.memoria_estadia
                    }
                  />

                  <div className="mt-5">
                    <h2 className="text-center text-blue-400 font-bold">
                      Acciones
                    </h2>

                    <div className="flex justify-center p-1">
                      <div className="flex gap-1">
                        <form onSubmit={handleSubmitRechazarMemoria}>
                          <button
                            type="submit"
                            disabled={memoriaRechazarLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaRechazarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <X size={18} /> Rechazar
                              </>
                            )}
                          </button>
                        </form>

                        <form onSubmit={handleSubmitAprobarMemoria}>
                          <button
                            type="submit"
                            disabled={memoriaAceptarLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaAceptarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <CircleCheck size={18} /> Aprobar
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
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
          </div>
          <div className="flex flex-col md:flex-row gap-5 w-full mt-5">
            <div
              className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
            hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
            >
              <h2 className="text-center text-emerald-500 font-bold text-2xl">
                Comprobante de Pago por Donación de Inmobiliaria
              </h2>

              <div className="my-2 flex gap-1 items-center">
                <p>Estado: </p>
                <Estado estado={proceso.proceso.pago_donacion} />
              </div>

              {proceso?.archivo?.comprobante_donacion === null ||
              proceso?.archivo?.comprobante_donacion === undefined ? (
                <Alerta>No hay archivo adjuntado</Alerta>
              ) : (
                <>
                  <p className="my-3 text-gray-600">Archivo Adjunto:</p>

                  <PDFViewer
                    url={
                      baseURL +
                      "/storage/pdfs/comprobantes/" +
                      proceso.archivo.comprobante_donacion
                    }
                  />

                  <div className="mt-5">
                    <h2 className="text-center text-blue-400 font-bold">
                      Acciones
                    </h2>

                    <div className="flex justify-center p-1">
                      <div className="flex gap-1">
                        <form onSubmit={handleSubmitRechazarComprobante}>
                          <button
                            type="submit"
                            disabled={comprobanteRechazarLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {comprobanteRechazarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <X size={18} /> Rechazar
                              </>
                            )}
                          </button>
                        </form>

                        <form onSubmit={handleSubmitAprobarComprobante}>
                          <button
                            type="submit"
                            disabled={comprobanteAceptarLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {comprobanteAceptarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <CircleCheck size={18} /> Aprobar
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
            hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
            >
              <h2 className="text-center text-emerald-500 font-bold text-2xl">
                Carga de Imágen para Titulo Universitario
              </h2>

              <div className="my-2 flex gap-1 items-center">
                <p>Estado: </p>
                <Estado estado={proceso.proceso.carga_imagen} />
              </div>

              {proceso?.archivo?.imagen_titulacion === null ||
              proceso?.archivo?.imagen_titulacion === undefined ? (
                <div className="mt-5">
                  <Alerta>No hay archivo adjuntado.</Alerta>
                </div>
              ) : (
                <>
                  <p className="my-3 text-gray-600">Archivo Adjunto:</p>

                  <img
                    src={
                      baseURL +
                      `/storage/imagenes/` +
                      proceso?.archivo?.imagen_titulacion
                    }
                    alt="imagen-titulacion"
                    className="w-full h-72 rounded-md object-cover shadow"
                  />

                  <div className="mt-5">
                    <h2 className="text-center text-blue-400 font-bold">
                      Acciones
                    </h2>

                    <div className="flex justify-center p-1">
                      <div className="flex gap-1">
                        <form onSubmit={handleSubmitRechazarImagen}>
                          <button
                            type="submit"
                            disabled={imagenRechazarLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {imagenRechazarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <X size={18} /> Rechazar
                              </>
                            )}
                          </button>
                        </form>

                        <form onSubmit={handleSubmitAprobarImagen}>
                          <button
                            type="submit"
                            disabled={imagenAceptarLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {imagenAceptarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <CircleCheck size={18} /> Aprobar
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className="p-5 border border-emerald-300 rounded-xl w-full shadow-md 
            hover:shadow-lg transition-all bg-gray-100 hover:-translate-y-1"
            >
              <h2 className="text-center text-emerald-500 font-bold text-2xl">
                Registro de Referencia de Pago por Titulo Universitario
              </h2>

              <div className="my-2 flex gap-1 items-center">
                <p>Estado: </p>
                <Estado estado={proceso.proceso.pago_titulo} />
              </div>

              {proceso?.archivo?.referencia_pago === null ||
              proceso?.archivo?.referencia_pago === undefined ? (
                <div className="mt-5">
                  <Alerta>No hay referencia registrada</Alerta>
                </div>
              ) : (
                <>
                  <p className="my-3 text-gray-600">Referencia Enviada:</p>

                  <p className="mt-1 p-2 bg-emerald-400 text-white font-bold rounded">
                    {proceso?.archivo?.referencia_pago}
                  </p>

                  <div className="mt-5">
                    <h2 className="text-center text-blue-400 font-bold">
                      Acciones
                    </h2>

                    <div className="flex justify-center p-1">
                      <div className="flex gap-1">
                        <form onSubmit={handleSubmitRechazarReferencia}>
                          <button
                            type="submit"
                            disabled={referenciaRechazarLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {referenciaRechazarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <X size={18} /> Rechazar
                              </>
                            )}
                          </button>
                        </form>

                        <form onSubmit={handleSubmitAprobarReferencia}>
                          <button
                            type="submit"
                            disabled={referenciaAceptarLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {referenciaAceptarLoading ? (
                              <ClipLoader color="#ffffff" size={24} />
                            ) : (
                              <>
                                <CircleCheck size={18} /> Aprobar
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
          >
            <X size={18} /> Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
