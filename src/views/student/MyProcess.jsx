import { useState, createRef } from "react";
import useSWR from "swr";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { NotebookPen, Send, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
import Loader from "../components/Loader";
import BarraProgreso from "../components/BarraProgreso";
import Estado from "../components/Estado";
import Alerta from "../components/Alerta";
import FormularioValidacion from "./FormularioValidacion";
import FormularioArchivo from "../components/FormularioArchivo";

export default function MyProcess() {
  const { user } = useAuth({ middleware: "auth" });
  const token = localStorage.getItem("AUTH_TOKEN");
  const shouldFetch = Boolean(user?.id);

  const [erroresMemoria, setErroresMemoria] = useState([]);
  const [cargandoMemoria, setCargandoMemoria] = useState(false);
  const [erroresReferencia, setErroresReferencia] = useState([]);
  const [cargandoReferencia, setCargandoReferencia] = useState(false);
  const [erroresComprobante, setErroresComprobante] = useState([]);
  const [cargandoComprobante, setCargandoComprobante] = useState(false);
  const [erroresImagen, setErroresImagen] = useState([]);
  const [cargandoImagen, setCargandoImagen] = useState(false);
  const [modalValidacionOpen, setModalValidacionOpen] = useState(false);

  // Refs
  const referenciaRef = createRef();
  const memoriaRef = createRef();
  const comprobanteRef = createRef();
  const imagenRef = createRef();

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

  const proceso = data?.data?.[0]?.proceso ?? null;

  const hanldeSubmitReferencia = async (e) => {
    e.preventDefault();
    setCargandoReferencia(true);

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

      setErroresReferencia([]);
      setCargandoReferencia(false);
      toast.success(data.message);
    } catch (error) {
      setErroresReferencia(Object.values(error.response.data.errors));
      setCargandoReferencia(false);

      setTimeout(() => setErroresReferencia([]), 5000);
    }
  };

  const handleSubmitMemoria = async (e) => {
    e.preventDefault();
    setCargandoMemoria(true);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("pdf", memoriaRef.current.files[0]);

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

      setErroresMemoria([]);
      setCargandoMemoria(false);
      toast.success(data.message);
    } catch (error) {
      setErroresMemoria(Object.values(error.response.data.errors));
      setCargandoMemoria(false);
      setTimeout(() => setErroresMemoria([]), 5000);
    }
  };

  const handleSubmitComprobante = async (e) => {
    e.preventDefault();
    setCargandoComprobante(true);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("pdf", comprobanteRef.current.files[0]);

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

      setErroresComprobante([]);
      setCargandoComprobante(false);
      toast.success(data.message);
    } catch (error) {
      setErroresComprobante(Object.values(error.response.data.errors));
      setCargandoComprobante(false);
      setTimeout(() => setErroresComprobante([]), 5000);
    }
  };

  const handleSubmitImagen = async (e) => {
    e.preventDefault();
    setCargandoImagen(true);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("imagen", imagenRef.current.files[0]);

    try {
      const { data } = await clienteAxios.post(
        "/api/archivo/imagen/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
      setErroresImagen([]);
      setCargandoImagen(false);
      toast.success(data.message);
    } catch (error) {
      setErroresImagen(Object.values(error.response.data.errors));
      setCargandoImagen(false);
      setTimeout(() => setErroresImagen([]), 5000);
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
              Estado: <Estado estado={proceso.validacion_memoria_estadia} />
            </p>
            <FormularioArchivo
              label="Memoria de Estadía (Archivo PDF)"
              accept="application/pdf"
              loading={cargandoMemoria}
              errors={erroresMemoria}
              onSubmit={handleSubmitMemoria}
              inputRef={memoriaRef}
            />
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
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
              Estado: <Estado estado={proceso.validacion_datos_personales} />
            </p>

            <div className="my-10 w-full flex justify-center">
              <button
                onClick={() => setModalValidacionOpen(true)}
                className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center"
              >
                <User /> Validar Datos Personales
              </button>
            </div>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
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
              Estado: <Estado estado={proceso.encuesta_egresados} />
            </p>

            <div className="my-10 w-full flex justify-center">
              <button className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center">
                <NotebookPen /> Realizar Encuesta
              </button>
            </div>

            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
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
              Estado: <Estado estado={proceso.carga_imagen} />
            </p>

            <FormularioArchivo
              label="Carga de Imágen (.jpg / .jpeg)"
              accept="image/jpeg, image/jpg"
              loading={cargandoImagen}
              errors={erroresImagen}
              onSubmit={handleSubmitImagen}
              inputRef={imagenRef}
            />

            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
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
              Estado: <Estado estado={proceso.pago_donacion} />
            </p>

            <FormularioArchivo
              label="Comprobante (Archivo PDF)"
              accept="application/pdf"
              loading={cargandoComprobante}
              errors={erroresComprobante}
              onSubmit={handleSubmitComprobante}
              inputRef={comprobanteRef}
            />

            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
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
              Estado: <Estado estado={proceso.pago_titulo} />
            </p>

            <form
              encType="multipart/form-data"
              className="w-full max-w-md mx-auto space-y-4 p-4 bg-gray-200 mt-3 shadow-md rounded-xl"
              onSubmit={hanldeSubmitReferencia}
            >
              {erroresReferencia.map((error, i) => (
                <Alerta key={i}>{error}</Alerta>
              ))}

              <label className="block text-gray-700 font-semibold">
                Refrencia de Pago (20 digitos):
              </label>

              <input
                type="tel"
                placeholder="Coloca tu referencia"
                required
                ref={referenciaRef}
                className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg p-2 
                    focus:border-blue-600 focus:ring-blue-600"
                defaultValue={data?.data?.[0]?.archivo?.referencia_pago}
              />
              <button
                type="submit"
                disabled={cargandoReferencia}
                className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 
                hover:-translate-y-1 transition flex gap-1 items-center justify-center w-26"
              >
                {cargandoReferencia ? (
                  <ClipLoader color="#ffffff" size={24} />
                ) : (
                  <>
                    <Send size={18} /> Enviar
                  </>
                )}
              </button>
            </form>
            <div className="mt-3">
              <p className="font-bold text-gray-800 text-lg mb-1">
                Comentarios:
              </p>
              <div className="max-h-44 overflow-y-scroll bg-gray-200 p-2 rounded">
                <ul className="space-y-3 w-full">
                  <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between">
                    <p className="font-semibold text-gray-700">Está Mal</p>
                    <p className="text-sm text-gray-400">23/07/2025</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormularioValidacion
        open={modalValidacionOpen}
        onClose={() => setModalValidacionOpen(false)}
        user={user}
        token={token}
      />
    </>
  );
}
