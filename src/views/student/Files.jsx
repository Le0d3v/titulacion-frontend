import useSWR from "swr";
import clienteAxios from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../components/Loader";
import { ClipLoader } from "react-spinners";
import PDFViewer from "../components/PDFViewer";
import { Download, File, GraduationCap, Info, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Alerta from "../components/Alerta";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import CartaExcencionPdf from "../pdf/CartaExcencionPdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useStudentTour } from "../../hooks/useStudentTour";
import { Video } from "lucide-react";

export default function Files() {
  const { user } = useAuth({ withMiddleware: "auth" });
  const token = localStorage.getItem("AUTH_TOKEN");
  const shouldFetch = Boolean(user?.id);
  const pdfRef = useRef();
  const { filesTour } = useStudentTour();

  const [memoriaLoading, setMemoriaLoading] = useState(false);
  const [comprobanteLoading, setComprobanteLoading] = useState(false);
  const [imagenLoading, setImagenLoading] = useState(false);

  const fetcher = () =>
    clienteAxios(`/api/students/all/${user.id}`).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/students/all/${user.id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (!user) return <Loader />;
  if (isLoading && shouldFetch) return <Loader />;
  if (error) return <div>Error al cargar los datos.</div>;

  const archivo = data?.data?.[0]?.archivo ?? null;
  const usuario = data?.data?.[0] ?? null;

  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmitDelete = async (e, type, setLoading) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await clienteAxios.post(
        `/api/archivo/${type}/destroy/${user.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generarPDF = async () => {
    const element = pdfRef.current;
    if (!element) return console.error("Elemento no encontrado.");

    try {
      // Obtiene tamaño real del div
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;

      // Captura el div
      const canvas = await html2canvas(element, {
        scale: 2, // mejora la resolución
        width: elementWidth,
        height: elementHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      // Obtiene dimensiones del PDF en mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("carta_excencion.pdf");
      await toast.success("Archivo Descargado");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-black" id="files-header">
        Mis Archivos
      </h1>
      <h1 className="text-center my-3">Visualiza tus archivos adjuntados</h1>
      <div className="flex w-full justify-center md:justify-end px-5 mt-5 md:mt-0 mb-5 md:m-0">
        <button
          onClick={() => {
            filesTour().drive();
          }}
          id="files-tutorial"
          className="p-2 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-500 
                            flex gap-1 hover:-translate-y-1 transition"
        >
          <Video />
          <p>Tutorial</p>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-5 overflow-auto">
        <div
          className="p-2 bg-white rounded-xl w-full text-black border-4 border-gray-300 hover:-translate-y-2 transition"
          id="files-card"
        >
          <h2
            className="text-center text-emerald-500 font-bold text-2xl "
            id="files-nombre"
          >
            Memoria de Estadía
          </h2>
          {archivo?.memoria_estadia === null ||
          archivo?.memoria_estadia === undefined ? (
            <div className="files-archivo">
              <div className="mt-5" id="files-alerta">
                <Alerta>No hay archivo adjuntado.</Alerta>
              </div>
            </div>
          ) : (
            <>
              <div className="files-archivo">
                <p className="my-3 text-gray-600">Archivo Adjunto:</p>
                <div>
                  <PDFViewer
                    url={
                      baseURL +
                      "/storage/pdfs/memorias/" +
                      archivo.memoria_estadia
                    }
                  />
                </div>
              </div>
              <div className="mt-5" id="files-acciones">
                <h2 className="text-center text-blue-400 font-bold">
                  Acciones
                </h2>
                <div className="flex justify-center p-1">
                  <div className="flex gap-1">
                    <form
                      onSubmit={(e) =>
                        handleSubmitDelete(e, "memoria", setMemoriaLoading)
                      }
                    >
                      <button
                        type="submit"
                        disabled={memoriaLoading}
                        className="p-2 rounded bg-red-500 text-white font-bold cursor-pointer
                      hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
                        id="files-eliminar"
                      >
                        {memoriaLoading ? (
                          <ClipLoader color="#ffffff" size={24} />
                        ) : (
                          <>
                            <Trash size={18} /> Elminar
                          </>
                        )}
                      </button>
                    </form>
                    <NavLink to={"/home/my-process"}>
                      <p
                        className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer
                    hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
                        id="files-nuevo"
                      >
                        Enviar Otro Archivo
                      </p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-2 bg-white rounded-xl w-full text-black border-4 border-gray-300 hover:-translate-y-2 transition">
          <h2 className="text-center text-emerald-500 font-bold text-2xl">
            Comprobante de Donación
          </h2>
          {!archivo?.comprobante_donacion ? (
            <div className="mt-5">
              <Alerta>No hay comprobante adjuntado.</Alerta>
            </div>
          ) : (
            <>
              <p className="my-3 text-gray-600">Archivo Adjunto:</p>
              <PDFViewer
                url={
                  baseURL +
                  "/storage/pdfs/comprobantes/" +
                  archivo.comprobante_donacion
                }
              />
              <div className="mt-5">
                <h2 className="text-center text-blue-400 font-bold">
                  Acciones
                </h2>
                <div className="flex justify-center p-1">
                  <div className="flex gap-1">
                    <form
                      onSubmit={(e) =>
                        handleSubmitDelete(
                          e,
                          "comprobante",
                          setComprobanteLoading
                        )
                      }
                    >
                      <button
                        type="submit"
                        disabled={comprobanteLoading}
                        className="p-2 rounded bg-red-500 text-white font-bold cursor-pointer
                      hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
                      >
                        {comprobanteLoading ? (
                          <ClipLoader color="#ffffff" size={24} />
                        ) : (
                          <>
                            <Trash size={18} /> Elminar
                          </>
                        )}
                      </button>
                    </form>
                    <NavLink to={"/home/my-process"}>
                      <p
                        className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer
                      hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
                      >
                        Enviar Otro Archivo
                      </p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-2 bg-white rounded-xl w-full text-black border-4 border-gray-300 hover:-translate-y-2 transition">
          <h2 className="text-center text-emerald-500 font-bold text-2xl">
            Imágen para Titulación
          </h2>
          {archivo?.imagen_titulacion ? (
            <>
              <p className="my-3 text-gray-600">Archivo Adjunto:</p>
              <img
                src={baseURL + `/storage/imagenes/` + archivo.imagen_titulacion}
                alt="imagen-titulacion"
                className="w-full h-72"
              />
              <div className="mt-5">
                <h2 className="text-center text-blue-400 font-bold">
                  Acciones
                </h2>
                <div className="flex justify-center p-1">
                  <div className="flex gap-1">
                    <form
                      onSubmit={(e) =>
                        handleSubmitDelete(e, "imagen", setImagenLoading)
                      }
                    >
                      <button
                        type="submit"
                        disabled={imagenLoading}
                        className="p-2 rounded bg-red-500 text-white font-bold cursor-pointer
                      hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
                      >
                        {imagenLoading ? (
                          <ClipLoader color="#ffffff" size={24} />
                        ) : (
                          <>
                            <Trash size={18} /> Elminar
                          </>
                        )}
                      </button>
                    </form>
                    <NavLink to={"/home/my-process"}>
                      <p
                        className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer
                    hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
                      >
                        Enviar Otro Archivo
                      </p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-5">
              <Alerta>No hay Imágen adjuntada.</Alerta>
            </div>
          )}
        </div>
      </div>
      <div>
        <div
          className="w-full mt-5 p-3 rounded-xl bg-white border-4 border-gray-300 text-black hover:-translate-y-1 transition"
          id="carta-excencion"
        >
          <div className="flex gap-1 items-center">
            <div className="p-1 rounded-full bg-blue-200 border-1 border-blue-600 flex justify-center items-center">
              <GraduationCap size={35} />
            </div>
            <h1 className="font-bold text-3xl">
              Carta de Excención de Titulación
            </h1>
          </div>
          <div className="flex justify-between gap- mt-5 flex-col md:flex-row">
            <div className="mt-5 md:w-1/2 w-full">
              <div className="flex justify-center text-red-500">
                <File size={65} />
              </div>
              <p className="text-center text-sm text-gray-400">
                Carta_Excencion.pdf
              </p>
              <p className="mt-5">
                La
                <span className="font-bold text-emerald-400 text-lg">
                  {" "}
                  Carta de Exención de Titulación{" "}
                </span>
                es un documento oficial que se solicita en el contexto
                académico, generalmente en instituciones de educación superior.
                Su propósito es liberar a un estudiante de la obligación de
                presentar un examen de titulación o de realizar un trabajo final
                para obtener su grado académico.
              </p>
            </div>
            <div className="mt-1 md:w-1/2 w-full">
              <h2 className="text-2xl text-emerald-400 font-bold text-center">
                Archivo Aquí:
              </h2>
              {usuario.proceso.completado === 1 ? (
                <div className="mt-1">
                  <div
                    ref={pdfRef}
                    style={{
                      position: "absolute", // saca el div de la pantalla
                      left: "-9999px", // fuera del viewport
                      top: "0",
                      width: "800px", // ancho fijo para PDF
                      backgroundColor: "#ffffff", // fondo blanco
                      padding: "40px", // padding opcional para que se vea bien
                    }}
                  >
                    <CartaExcencionPdf usuario={usuario} />
                  </div>

                  <div className="flex justify-center text-red-500">
                    <File size={65} />
                  </div>
                  <p className="text-center text-sm text-gray-400">
                    Carta_Excencion.pdf
                  </p>
                  <div className="mt-5 flex justify-center">
                    <button
                      onClick={generarPDF}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-blue-700 hover:-translate-y-1 transition"
                      id="files-descargar"
                    >
                      <Download />
                      <p>Descargar PDF</p>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full mt-3 flex justify-center">
                  <div className="p-3 rounded-lg bg-red-200 border-2 border-red-600 text-white max-w-100 flex justify-center">
                    <div className="flex gap-1 text-red-500">
                      <Info />
                      <p>Completa tu proceso de titulación para obtener</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
