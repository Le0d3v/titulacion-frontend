import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function ProcesosContainer({ procesos }) {
  // Estado para almacenar los porcentajes de completado y actividades
  const [porcentajes, setPorcentajes] = useState([]);
  const [actividadesCompletadas, setActividadesCompletadas] = useState([]);
  const [actividadesPendientes, setActividadesPendientes] = useState([]);

  // Función para calcular el porcentaje de completado y actividades
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

  // Efecto para actualizar los datos cuando cambian los procesos
  useEffect(() => {
    const nuevosDatos = procesos.map((proceso) =>
      calcularDatosProceso(proceso.proceso)
    );
    const nuevosPorcentajes = nuevosDatos.map(
      (data) => data.porcentajeCompletado
    );
    const nuevasCompletadas = nuevosDatos.map((data) => data.completadas);
    const nuevasPendientes = nuevosDatos.map((data) => data.pendientes);

    setPorcentajes(nuevosPorcentajes);
    setActividadesCompletadas(nuevasCompletadas);
    setActividadesPendientes(nuevasPendientes);
  }, [procesos]);

  return (
    <div className="w-full">
      <div className="mt-3 w-full p-3 bg-gray-400/50 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-md">
            Procesos Totales:
            <span className="text-emerald-400 font-bold text-lg">
              {" " + procesos.length}
            </span>
          </p>
          <div className="flex p-1 gap-1 bg-gray-800/50 rounded-lg items-center mt-5 md:mt-0 md:w-auto">
            <Search />
            <input type="text" placeholder="Buscar Proceso" className="p-1" />
          </div>
        </div>
        <div className="mt-3 max-h-100 overflow-y-scroll pl-1 pr-3 py-2">
          {procesos.map((proceso, index) => (
            <div key={index} className="p-2 bg-white rounded-lg my-2">
              <div className="flex justify-between text-black">
                <div>
                  <h1 className="font-bold text-emerald-300 text-lg">
                    Estudiante:
                  </h1>
                  <div className="mt-1">
                    <p className="text-sm">
                      {" " +
                        proceso.name +
                        " " +
                        proceso.apellido_paterno +
                        " " +
                        proceso.apellido_materno}{" "}
                      ({proceso.datos_escolares.carrera})
                    </p>
                    <p className="text-sm">
                      Matricula:
                      <span className="text-sm font-bold text-blue-400">
                        {" " + proceso.datos_escolares.matricula}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="h-auto">
                  <h1 className="font-bold text-emerald-300 text-lg">
                    Estado:
                  </h1>
                  <div className="mt-2">
                    {proceso.proceso.completado === 1 ? (
                      <span className="p-1 bg-green-400 text-white font-bold rounded-md">
                        Completado
                      </span>
                    ) : (
                      <span className="p-1 bg-red-500 text-white font-bold rounded-md">
                        Pendiente
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <h1 className="text-center font-bold text-emerald-300 text-lg">
                  Porcentaje del Proceso:
                </h1>
                <div className="flex gap-3 text-black">
                  <div className="w-1/4">
                    <p className="text-center text-sm">
                      Actividades Pendientes:
                    </p>
                    <p className="text-2xl font-bold text-red-400 text-center">
                      {" " + actividadesPendientes[index]}
                    </p>
                  </div>
                  <div className="w-2/4">
                    <p className="text-center text-sm text-emerald-300">
                      {`${porcentajes[index]}%`}
                    </p>
                    <div className="relative w-full h-4 bg-gray-200 rounded mt-1">
                      <div
                        className="absolute h-full bg-green-500 rounded"
                        style={{ width: `${porcentajes[index] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-1/4">
                    <p className="text-center text-sm">
                      Actividades Completadas:
                    </p>
                    <p className="text-2xl font-bold text-blue-400 text-center">
                      {" " + actividadesCompletadas[index]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <button className="p-1 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700 hover:-translate-y-1 transition">
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
