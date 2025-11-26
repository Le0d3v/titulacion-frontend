import { CircleCheck, Clock, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function BarraProgreso({ proceso }) {
  const [porcentajeCompletado, setPorcentajeCompletado] = useState(0);
  const [actividadesCompletadas, setActividadesCompletadas] = useState(0);
  const [actividadesPendientes, setActividadesPendientes] = useState(0);

  const calcularDatosProceso = (proceso) => {
    const actividades = [
      "validacion_memoria_estadia",
      "encuesta_egresados",
      "validacion_datos_personales",
      "carga_imagen",
      "pago_donacion",
      "pago_titulo",
    ];

    const completadas = actividades.filter(
      (actividad) => proceso[actividad] === 1
    ).length;
    const totalActividades = actividades.length;
    const pendientes = totalActividades - completadas;

    const porcentajeCompletado = Math.round(
      (completadas / totalActividades) * 100
    );

    return {
      porcentajeCompletado,
      completadas,
      pendientes,
    };
  };

  useEffect(() => {
    if (proceso) {
      const { porcentajeCompletado, completadas, pendientes } =
        calcularDatosProceso(proceso);

      setPorcentajeCompletado(porcentajeCompletado);
      setActividadesCompletadas(completadas);
      setActividadesPendientes(pendientes);
    }
  }, [proceso]);

  return (
    <div className="flex gap-5 w-full md:flex-row flex-col md:p-0 px-5 "> 
      <div
        id="my-proceso-completadas"
        className="md:w-1/4 w-full p-3 bg-gray-100 rounded-xl text-black"
      >
        <div className="flex justify-center">
          <CircleCheck size={35} className="text-blue-400" />
        </div>
        <p className="text-sm text-center mt-1">Actividades Completadas:</p>
        <p className="text-3xl text-blue-400 text-center font-bold">
          {actividadesCompletadas}
        </p>
      </div>
      <div className="md:w-2/4 w-full" id="my-proceso-barra">
        <h1 className="my-1 text-center text-gray-700 font-bold">
          Progreso Total:
        </h1>
        <p className="text-center text-emerald-400 font-bold my-1">
          {porcentajeCompletado}%
        </p>
        <div className="w-full bg-gray-300 rounded">
          <div
            className="bg-emerald-400 h-4 rounded"
            style={{
              width: `${porcentajeCompletado}%`,
            }}
          />
        </div>
      </div>
      <div
        className="md:w-1/4 w-full p-3 bg-gray-100 rounded-xl text-black"
        id="my-proceso-pendientes"
      >
        <div className="flex justify-center">
          <Clock size={35} className="text-red-400" />
        </div>
        <p className="text-sm text-center mt-1">Actividades Pendientes:</p>
        <p className="text-3xl text-red-400 text-center font-bold">
          {actividadesPendientes}
        </p>
      </div>
    </div>
  );
}
