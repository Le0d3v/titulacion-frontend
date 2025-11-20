import useSWR from "swr";
import clienteAxios from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../components/Loader";
import { ClipLoader } from "react-spinners";
import PDFViewer from "../components/PDFViewer";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Alerta from "../components/Alerta";
import { NavLink } from "react-router-dom";

export default function Files() {
  const { user } = useAuth({ withMiddleware: "auth" });
  const token = localStorage.getItem("AUTH_TOKEN");
  const shouldFetch = Boolean(user?.id);

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

  // Cambia esta base URL a la de tu servidor
  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmitDeleteMemoria = async (e) => {
    e.preventDefault();
    setMemoriaLoading(true);

    try {
      const { data } = await clienteAxios.post(
        `/api/archivo/memoria/destroy/${user.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMemoriaLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitDeleteComprobante = async (e) => {
    e.preventDefault();
    setComprobanteLoading(true);

    try {
      const { data } = await clienteAxios.post(
        `/api/archivo/comprobante/destroy/${user.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComprobanteLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitDeleteImagen = async (e) => {
    e.preventDefault();
    setImagenLoading(true);

    try {
      const { data } = await clienteAxios.post(
        `/api/archivo/imagen/destroy/${user.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImagenLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-black">Mis Archivos</h1>
      <h1 className="text-center my-3">Visualiza tus archivos adjuntados</h1>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <div className="p-2 bg-white rounded w-full text-black">
          <h2 className="text-center text-emerald-500 font-bold text-2xl">
            Memoria de Estadía
          </h2>
          {archivo?.memoria_estadia === null ||
          archivo?.memoria_estadia === undefined ? (
            <div className="mt-5">
              <Alerta>No hay archivo adjuntado.</Alerta>
            </div>
          ) : (
            <>
              <p className="my-3 text-gray-600">Archivo Adjunto:</p>
              <PDFViewer
                url={
                  baseURL + "/storage/pdfs/memorias/" + archivo.memoria_estadia
                }
              />
              <div className="mt-5">
                <h2 className="text-center text-blue-400 font-bold">
                  Acciones
                </h2>
                <div className="flex justify-center p-1">
                  <div className="flex gap-1">
                    <form onSubmit={handleSubmitDeleteMemoria}>
                      <button
                        type="submit"
                        disabled={memoriaLoading}
                        className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                      hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
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
                        className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer
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
        <div className="p-2 bg-white rounded w-full text-black">
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
                    <form onSubmit={handleSubmitDeleteComprobante}>
                      <button
                        type="submit"
                        disabled={comprobanteLoading}
                        className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
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
                        className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer
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
        <div className="p-2 bg-white rounded w-full text-black">
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
                    <form onSubmit={handleSubmitDeleteImagen}>
                      <button
                        type="submit"
                        disabled={imagenLoading}
                        className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
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
                        className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer
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
    </>
  );
}
