import { useState, createRef } from "react";
import useSWR from "swr";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Info, NotebookPen, Send, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
import Loader from "../components/Loader";
import BarraProgreso from "../components/BarraProgreso";
import Estado from "../components/Estado";
import Alerta from "../components/Alerta";
import FormularioValidacion from "./FormularioValidacion";
import FormularioArchivo from "../components/FormularioArchivo";
import Encuesta from "./Encuesta";
import Comentarios from "../components/Comentarios";
import { useStudentTour } from "../../hooks/useStudentTour";
import { Video } from "lucide-react";

export default function MyProcess() {
  const { user } = useAuth({ middleware: "auth" });
  const token = localStorage.getItem("AUTH_TOKEN");
  const shouldFetch = Boolean(user?.id);
  const { procesoTour } = useStudentTour();

  const [erroresMemoria, setErroresMemoria] = useState([]);
  const [cargandoMemoria, setCargandoMemoria] = useState(false);
  const [erroresReferencia, setErroresReferencia] = useState([]);
  const [cargandoReferencia, setCargandoReferencia] = useState(false);
  const [erroresComprobante, setErroresComprobante] = useState([]);
  const [cargandoComprobante, setCargandoComprobante] = useState(false);
  const [erroresImagen, setErroresImagen] = useState([]);
  const [cargandoImagen, setCargandoImagen] = useState(false);

  const [modalValidacionOpen, setModalValidacionOpen] = useState(false);
  const [modalEncuestaOpen, setModalEncuestaOpen] = useState(false);

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
  const usuario = data?.data?.[0];

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
      <div className="text-center text-3xl font-black" id="my-proceso-header">
        Mi Proceso
      </div>
      <div className="flex w-full justify-end px-5">
        <button
          onClick={() => {
            procesoTour().drive();
          }}
          id="my-proceso-tutorial"
          className="p-2 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-500 
                      flex gap-1 hover:-translate-y-1 transition"
        >
          <Video />
          <p>Tutorial</p>
        </button>
      </div>
      <div className="w-full my-3" id="my-proceso-general">
        {proceso && <BarraProgreso proceso={proceso} />}
      </div>

      <div className="mt-5">
        <h1 className="text-center font-bold text-xl">
          Actividades Correspondientes:
        </h1>

        <div className="w-full p-1 flex flex-col md:flex-row gap-5 mt-3">
          <div
            className="w-full p-5 rounded-lg bg-white text-black"
            id="my-proceso-card"
          >
            <h1
              className="text-center text-2xl font-bold text-emerald-500"
              id="my-proceso-nombre"
            >
              Validación de Memoria de Estadía
            </h1>
            <p className="mt-3 font-bold" id="my-proceso-estado">
              Estado: <Estado estado={proceso.validacion_memoria_estadia} />
            </p>
            <div id="my-proceso-cargar">
              <div>
                <p className="text-xl font-bold text-gray-600 mt-5">
                  Cargar Archivo
                </p>
                <div className="flex gap-1 text-blue-400 text-sm mt-1 items-center">
                  <Info size={20} />
                  <p>
                    Incluir el formato de nombre: (Memoria_Estadia_[tu
                    matricula].pdf).
                  </p>
                </div>
              </div>
              <FormularioArchivo
                label="Memoria de Estadía (Archivo PDF)"
                accept="application/pdf"
                loading={cargandoMemoria}
                errors={erroresMemoria}
                onSubmit={handleSubmitMemoria}
                inputRef={memoriaRef}
              />
            </div>
            <Comentarios
              comentarios={usuario.comentarios.comentarios_memoria}
            />
          </div>

          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Validación de Datos Personales
            </h1>
            <p className="mt-3 font-bold">
              Estado: <Estado estado={proceso.validacion_datos_personales} />
            </p>
            <div clasn>
              <p className="text-xl font-bold text-gray-600 mt-5">
                Validar Datos
              </p>
              <div className="flex gap-1 text-blue-400 text-sm mt-1 items-center">
                <Info size={20} />
                <p>
                  Haz clic al botón "Validar Datos Personales" para ejecutar tu
                  proceso.
                </p>
              </div>
            </div>
            <div className="mt-5 w-full flex justify-center">
              <button
                onClick={() => setModalValidacionOpen(true)}
                className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center"
              >
                <User /> Validar Datos Personales
              </button>
            </div>
            <div className="p-3">
              <Comentarios comentarios={[]} />
            </div>
          </div>
        </div>
        <div className="w-full p-1 flex flex-col md:flex-row gap-5 mt-3">
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Encuesta de Egresados
            </h1>
            <p className="mt-3 font-bold">
              Estado: <Estado estado={proceso.encuesta_egresados} />
            </p>
            <div clasn>
              <p className="text-xl font-bold text-gray-600 mt-5">
                Realizar encuesta
              </p>
              <div className="flex gap-1 text-blue-400 text-sm mt-1 items-center">
                <Info size={20} />
                <p>
                  Haz clic en el botón "Realizar Encuesta" para ejecutar tu
                  proceso.
                </p>
              </div>
            </div>
            <div className="mt-5 w-full flex justify-center p-3">
              <button
                className="p-2 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center"
                id="my-proceso-enlace"
                onClick={() => setModalEncuestaOpen(true)}
              >
                <NotebookPen /> Realizar Encuesta
              </button>
            </div>
            <Comentarios comentarios={[]} />
          </div>

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

            <Comentarios comentarios={usuario.comentarios.comentarios_imagen} />
          </div>
        </div>

        <div className="w-full p-1 flex flex-col md:flex-row gap-5 mt-3">
          <div className="w-full p-2 rounded-lg bg-white text-black">
            <h1 className="text-center text-2xl font-bold text-emerald-500">
              Comprobante de Pago de Donación
            </h1>
            <p className="mt-3 font-bold">
              Estado: <Estado estado={proceso.pago_donacion} />
            </p>
            <div>
              <p className="text-xl font-bold text-gray-600 mt-5">
                Cargar Archivo
              </p>
              <div className="flex gap-1 text-blue-400 text-sm mt-1 items-center">
                <Info size={20} />
                <p>
                  Incluir el formato de nombre: (Comprobante_Donacion_[tu
                  matricula].pdf).
                </p>
              </div>
            </div>
            <FormularioArchivo
              label="Comprobante (Archivo PDF)"
              accept="application/pdf"
              loading={cargandoComprobante}
              errors={erroresComprobante}
              onSubmit={handleSubmitComprobante}
              inputRef={comprobanteRef}
            />
            <div className="mt-3">
              <Comentarios
                comentarios={usuario.comentarios.comentarios_comprobante}
              />
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

              <div id="my-proceso-referencia">
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
              </div>
              <button
                type="submit"
                disabled={cargandoReferencia}
                className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 
                hover:-translate-y-1 transition flex gap-1 items-center justify-center w-26"
                id="my-proceso-referencia-boton"
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
            <Comentarios
              comentarios={usuario.comentarios.comentarios_referencia}
            />
          </div>
        </div>
      </div>
      <FormularioValidacion
        open={modalValidacionOpen}
        onClose={() => setModalValidacionOpen(false)}
        user={user}
        token={token}
      />

      <Encuesta
        open={modalEncuestaOpen}
        onClose={() => setModalEncuestaOpen(false)}
        user={usuario}
        token={token}
      />
    </>
  );
}
