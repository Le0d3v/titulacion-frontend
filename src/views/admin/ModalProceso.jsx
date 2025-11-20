import { X, Trash, CircleCheck } from "lucide-react";
import BarraProgreso from "../components/BarraProgreso";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import PDFViewer from "../components/PDFViewer";
import Estado from "../components/Estado";
import Alerta from "../components/Alerta";

export default function ModalProceso({ open, onClose, proceso }) {
  if (!open || !proceso) return null;

  const [memoriaLoading, setMemoriaLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmitAprobarMemoria = async (e) => {};

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
            {/* TARJETA 1 */}
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
                        <form onSubmit={handleSubmitAprobarMemoria}>
                          <button
                            type="submit"
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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

            {/* TARJETA 2 */}
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

            {/* TARJETA 3 */}
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

          {/* GRUPO 2 */}
          <div className="flex flex-col md:flex-row gap-5 w-full mt-5">
            {/* TARJETA 4 */}
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
                        <form onSubmit={handleSubmitAprobarMemoria}>
                          <button
                            type="submit"
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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

            {/* TARJETA 5 */}
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
                        <form onSubmit={handleSubmitAprobarMemoria}>
                          <button
                            type="submit"
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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

            {/* TARJETA 6 */}
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
                        <form onSubmit={handleSubmitAprobarMemoria}>
                          <button
                            type="submit"
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                            hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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
                            disabled={memoriaLoading}
                            className="px-2 py-1 rounded bg-green-500 text-white font-bold cursor-pointer
                            hover:bg-green-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-28"
                          >
                            {memoriaLoading ? (
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
