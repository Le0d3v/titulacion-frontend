import { useStudentData } from "../../hooks/useStudentData";
import { useStudentTour } from "../../hooks/useStudentTour";
import Loader from "../components/Loader";
import BarraProgreso from "../components/BarraProgreso";
import Estado from "../components/Estado";
import { Video, User } from "lucide-react";

export default function Home() {
  const { homeTour } = useStudentTour();
  const { usuario, isLoading, error } = useStudentData();

  if (isLoading || !usuario) return <Loader />;
  if (error) return <div>Error al cargar los datos.</div>;

  return (
    <>
      <div id="home-header">
        <h1 className="text-center text-4xl font-black">
          Bienvenido {usuario.name}
        </h1>
        <p className="text-center dark:text-gray-200 mt-1 text-black">
          Universidad Tecnológica de Huejozingo. Módulo de Titulación
        </p>
      </div>
      <div className="flex w-full justify-center md:justify-end px-5 mt-5 md:mt-0">
        <button
          onClick={() => {
            homeTour().drive();
          }}
          id="home-tutorial"
          className="p-2 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-500 
                  flex gap-1 hover:-translate-y-1 transition"
        >
          <Video />
          <p>Tutorial</p>
        </button>
      </div>
      <h2 className="text-center font-bold text-emerald-400 my-4 text-xl">
        Información General
      </h2>
      <div
        className="flex flex-col md:flex-row gap-5 w-full mt-2 md:mt-5 p-3 md:p-0"
        id="home-main"
      >
        <div
          className="w-full xl:w-2/5 p-3 bg-cyan-100 border-4 border-cyan-300 rounded-3xl shadow"
          id="home-contenedor-1"
        >
          <div className="w-full flex justify-center">
            <div>
              <div
                className="p-3 bg-blue-400 text-white flex justify-center items-center rounded-full border-1 border-blue-600
                w-19 mx-auto"
              >
                <User size={50} />
              </div>
              <p className="text-black font-black text-2xl">
                {usuario.name +
                  " " +
                  usuario.apellido_paterno +
                  " " +
                  usuario.apellido_materno}
              </p>
            </div>
          </div>
          <div className="mt-3 text-black">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="">
                <p>Matricula:</p>
                <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                  {usuario.datos_escolares.matricula}
                </div>
              </div>
              <div className="w-full">
                <p>Carrera:</p>
                <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                  {usuario.datos_escolares.carrera}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-3">
              <div className="w-full md:w-2/3">
                <p>Especialidad:</p>
                <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                  {usuario.datos_escolares.especialidad}
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <p>Cuatrimestre:</p>
                <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                  {usuario.datos_escolares.cuatrimestre}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-3">
              <div className="w-full md:w-2/3">
                <p>Turno:</p>
                <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                  {usuario.datos_escolares.turno}
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <p>Grupo:</p>
                <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                  {usuario.datos_escolares.grupo}
                </div>
              </div>
            </div>

            <div className="w-full mt-3">
              <p>Correo Electrónico:</p>
              <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                {usuario.email}
              </div>
            </div>
            <div className="w-full mt-3">
              <p>Número Telefónico:</p>
              <div className="py-1 px-2 rounded bg-blue-300 border-2 border-blue-400 text-white mt-1 font-bold text-xl">
                {usuario.telefono}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-3/5">
          <div
            className="bg-emerald-100 border-4 border-emerald-300 rounded-xl p-3"
            id="home-contenedor-2"
          >
            <div>
              <BarraProgreso proceso={usuario.proceso} />
            </div>
          </div>
          <div
            className="mt-5 bg-indigo-100 border-4 border-indigo-300 rounded-xl p-3"
            id="home-contenedor-3"
          >
            <h2 className="text-center text-xl font-bold text-black">
              Actividades:
            </h2>
            <div className="mt-3 w-full flex flex-col md:flex-row gap-3">
              <div className="p-2 bg-indigo-300 border-2 border-indigo-600 text-white rounded w-full">
                <p className="text-center font-bold text-lg">
                  Validación de Memoria de Estadía
                </p>
                <p className="text-center text-sm">Estado:</p>
                <div className="my-1 flex justify-center">
                  <Estado estado={usuario.proceso.validacion_memoria_estadia} />
                </div>
              </div>
              <div className="p-2 bg-emerald-300 border-2 border-emerald-600 text-white rounded w-full">
                <p className="text-center font-bold text-lg">
                  Validación de Datos Personales
                </p>
                <p className="text-center text-sm">Estado:</p>
                <div className="my-1 flex justify-center">
                  <Estado
                    estado={usuario.proceso.validacion_datos_personales}
                  />
                </div>
              </div>
              <div className="p-2 bg-red-300 border-2 border-red-600 text-white rounded w-full">
                <p className="text-center font-bold text-lg">
                  Realizar Encuesta de Egresados
                </p>
                <p className="text-center text-sm">Estado:</p>
                <div className="my-1 flex justify-center">
                  <Estado estado={usuario.proceso.encuesta_egresados} />
                </div>
              </div>
            </div>
            <div className="mt-3 w-full flex flex-col md:flex-row gap-3">
              <div className="p-2 bg-purple-300 border-2 border-purple-600 text-white rounded w-full">
                <p className="text-center font-bold text-lg">
                  Imágen para Titulo Profesional
                </p>
                <p className="text-center text-sm">Estado:</p>
                <div className="my-1 flex justify-center">
                  <Estado estado={usuario.proceso.carga_imagen} />
                </div>
              </div>
              <div className="p-2 bg-sky-300 border-2 border-sky-600 text-white rounded w-full">
                <p className="text-center font-bold text-lg">
                  Envío de Comprobante de Donación
                </p>
                <p className="text-center text-sm">Estado:</p>
                <div className="my-1 flex justify-center">
                  <Estado estado={usuario.proceso.pago_donacion} />
                </div>
              </div>
              <div className="p-2 bg-orange-300 border-2 border-orange-600 text-white rounded w-full">
                <p className="text-center font-bold text-lg">
                  Pago para obtención de Titulo Profesional
                </p>
                <p className="text-center text-sm">Estado:</p>
                <div className="my-1 flex justify-center">
                  <Estado estado={usuario.proceso.pago_titulo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
