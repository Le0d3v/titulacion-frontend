import { useAuth } from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
import useSWR from "swr";
import Loader from "../components/Loader";
import BarraProgreso from "../../views/components/BarraProgreso";
import Estado from "../components/Estado";
import { NotebookPen, Send, User } from "lucide-react";
import { useState, createRef } from "react";
import Alerta from "../components/Alerta";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function MyProcess() {
  const { user } = useAuth({ middleware: "auth" });
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const referenciaRef = createRef();
  const memoriaRef = createRef();
  const comprobanteRef = createRef();
  const token = localStorage.getItem("AUTH_TOKEN");
  const shouldFetch = Boolean(user?.id);

  const fetcher = () =>
    clienteAxios(`/api/students/all/${user.id}`).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/students/all/${user.id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  // Mientras useAuth carga al usuario
  if (!user) return <Loader />;

  // Mientras SWR carga datos
  if (isLoading && shouldFetch) return <Loader />;

  if (error) return <div>Error al cargar los datos.</div>;

  const proceso = data?.data?.[0]?.proceso ?? null;

  const hanldeSubmitReferencia = async (e) => {
    e.preventDefault();
    setCargando(true);

    const datos = {
      id: user.id,
      referencia_pago: referenciaRef.current.value,
    };

    try {
      const { data } = await clienteAxios.post(
        "/api/archivo/referencia/store",
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data.message);
      setErrores([]);
      setCargando(false);
      await toast.success(data.message);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      setCargando(false);

      setTimeout(() => {
        setErrores([]);
      }, 5000);
    }
  };

  const handleSubmitMemoria = async (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("pdf", memoriaRef.current.files[0]); // <--- EL ARCHIVO REAL

    try {
      const { data } = await clienteAxios.post(
        "/api/archivo/memoria/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data.message);
      setErrores([]);
      setCargando(false);
      toast.success(data.message);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      setCargando(false);

      setTimeout(() => setErrores([]), 5000);
    }
  };

  const handleSubmitComprobante = async (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("pdf", comprobanteRef.current.files[0]); // <--- EL ARCHIVO REAL

    try {
      const { data } = await clienteAxios.post(
        "/api/archivo/comprobante/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data.message);
      setErrores([]);
      setCargando(false);
      toast.success(data.message);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      setCargando(false);

      setTimeout(() => setErrores([]), 5000);
    }
  };

  return (
    <>
      <div className="text-center text-3xl font-black">Mi Proceso</div>

      <div className="w-full my-3">
        {proceso && <BarraProgreso proceso={proceso} />}
      </div>

      <div className="mt-5">
        <h1 className="text-center font-bold text-xl">
          Actividades Correspondientes:
        </h1>
        <div className="w-full p-1 flex flex-col md:flex-row gap-5 mt-3">
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Validación de Memoria de Estadía
            </h1>
            <p className="mt-3 font-bold">
              Estado: {"  "}
              <Estado estado={proceso.validacion_memoria_estadia} />
            </p>
            <form
              encType="multipart/form-data"
              className="w-full max-w-md mx-auto space-y-4 p-4 bg-gray-200 mt-3 shadow-md rounded-xl"
              onSubmit={handleSubmitMemoria}
            >
              {errores.map((error, i) => (
                <Alerta key={i}>{error}</Alerta>
              ))}
              <label className="block text-gray-700 font-semibold">
                Memoria de Estadía (PDF):
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  className="block w-full text-sm text-gray-700 
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-600 file:text-white
                 hover:file:bg-blue-700
                 cursor-pointer
                 bg-gray-50 border border-gray-300 rounded-lg p-2"
                  ref={memoriaRef}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-26"
                  disabled={cargando}
                >
                  {cargando ? (
                    <ClipLoader color="#ffffff" size={24} className="" />
                  ) : (
                    <>
                      <Send size={18} />
                      <p>Enviar</p>
                    </>
                  )}
                </button>
              </div>
            </form>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">26/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Validación de Datos Personales
            </h1>
            <p className="mt-3 font-bold">
              Estado: {"  "}
              <Estado estado={proceso.validacion_datos_personales} />
            </p>
            <div className="my-10 w-full flex justify-center">
              <button className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center">
                <User />
                Validar Datos Personales
              </button>
            </div>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">26/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Encuesta de Egresados
            </h1>
            <p className="mt-3 font-bold">
              Estado: {"  "}
              <Estado estado={proceso.encuesta_egresados} />
            </p>
            <div className="my-10 w-full flex justify-center">
              <button className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center">
                <NotebookPen />
                Realizar Encuesta
              </button>
            </div>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">26/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-1 flex flex-col md:flex-row gap-5 mt-3">
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Carga de Imágen para Titulación
            </h1>
            <p className="mt-3 font-bold">
              Estado: {"  "}
              <Estado estado={proceso.carga_imagen} />
            </p>
            <form
              encType="multipart/form-data"
              className="w-full max-w-md mx-auto space-y-4 p-4 bg-gray-200 mt-3 shadow-md rounded-xl"
            >
              <label className="block text-gray-700 font-semibold">
                Imágen (jpg/jpeg):
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg, image/jpg"
                  className="block w-full text-sm text-gray-700 
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-600 file:text-white
                 hover:file:bg-blue-700
                 cursor-pointer
                 bg-gray-50 border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center"
                >
                  <Send size={18} />
                  <p>Enviar</p>
                </button>
              </div>
            </form>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">26/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Comprobante de Pago de Donación
            </h1>
            <p className="mt-3 font-bold">
              Estado: {"  "}
              <Estado estado={proceso.pago_donacion} />
            </p>
            <form
              encType="multipart/form-data"
              className="w-full max-w-md mx-auto space-y-4 p-4 bg-gray-200 mt-3 shadow-md rounded-xl"
              onSubmit={handleSubmitComprobante}
            >
              {errores.map((error, i) => (
                <Alerta key={i}>{error}</Alerta>
              ))}
              <label className="block text-gray-700 font-semibold">
                Comprobante (PDF):
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  className="block w-full text-sm text-gray-700 
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-600 file:text-white
                 hover:file:bg-blue-700
                 cursor-pointer
                 bg-gray-50 border border-gray-300 rounded-lg p-2"
                  ref={comprobanteRef}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-26"
                  disabled={cargando}
                >
                  {cargando ? (
                    <ClipLoader color="#ffffff" size={24} className="" />
                  ) : (
                    <>
                      <Send size={18} />
                      <p>Enviar</p>
                    </>
                  )}
                </button>
              </div>
            </form>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">26/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Registro de Pago de Titulo Universitario
            </h1>
            <p className="mt-3 font-bold">
              Estado: {"  "}
              <Estado estado={proceso.pago_titulo} />
            </p>
            <form
              encType="multipart/form-data"
              className="w-full max-w-md mx-auto space-y-4 p-4 bg-gray-200 mt-3 shadow-md rounded-xl"
              onSubmit={hanldeSubmitReferencia}
            >
              {errores.map((error, i) => (
                <Alerta key={i}>{error}</Alerta>
              ))}
              <label className="block text-gray-700 font-semibold">
                Refrencia de Pago (20 digitos):
              </label>

              <div className="relative">
                <input
                  type="tel"
                  placeholder="Coloca tu referencia"
                  className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg p-2 
                    focus:border-blue-600 focus:ring-blue-600"
                  required
                  ref={referenciaRef}
                />
              </div>
              <div className=""></div>
            </form>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">26/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
