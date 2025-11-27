import { useState } from "react";
import { Search } from "lucide-react";
import BarraProgreso from "./BarraProgreso";
import ModalProceso from "../admin/ModalProceso";

export default function ProcesosContainer({ procesos }) {
  const [showModalProceso, setShowModalProceso] = useState(false);
  const [procesoSeleccionadoId, setProcesoSeleccionadoId] = useState(null);

  const [search, setSearch] = useState("");

  const handleVerMas = (proceso) => {
    setProcesoSeleccionadoId(proceso.id);
    setShowModalProceso(true);
  };

  // ---------- FILTRO DINÁMICO ----------
  const procesosFiltrados = procesos.filter((proceso) => {
    if (!search) return true;

    const texto = search.toLowerCase();

    const nombreCompleto = [
      proceso?.name,
      proceso?.apellido_paterno,
      proceso?.apellido_materno,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matricula = (proceso?.datos_escolares?.matricula ?? "").toLowerCase();
    const carrera = (proceso?.datos_escolares?.carrera ?? "").toLowerCase();

    return (
      nombreCompleto.includes(texto) ||
      matricula.includes(texto) ||
      carrera.includes(texto)
    );
  });

  return (
    <div className="w-full">
      <div className="mt-3 w-full p-3 bg-gray-100 dark:bg-gray-400/50 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-md" id="proceso-container-total">
            Procesos Totales:
            <span className="text-emerald-400 font-bold text-lg">
              {" " + procesosFiltrados.length}
            </span>
          </p>

          <div
            className="flex p-1 gap-1 bg-emerald-400 dark:bg-gray-800/50 rounded-lg items-center mt-5 md:mt-0 md:w-auto"
            id="proceso-container-buscador"
          >
            <Search className="text-white" />
            <input
              type="text"
              placeholder="Buscar Proceso"
              className="p-1 bg-transparent outline-none text-white placeholder-white dark:placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3 max-h-100 overflow-y-scroll pl-1 pr-3 py-2">
          {procesosFiltrados.map((proceso, index) => (
            <div
              key={index}
              className="p-2 bg-white rounded-lg my-2"
              id="proceso-card-1"
            >
              <div className="flex justify-between text-black">
                <div>
                  <h1 className="font-bold text-emerald-300 text-lg">
                    Estudiante:
                  </h1>
                  <div className="mt-1">
                    <p className="text-sm">
                      {proceso.name} {proceso.apellido_paterno}{" "}
                      {proceso.apellido_materno} (
                      {proceso.datos_escolares.carrera})
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
                <h1 className="text-center font-bold text-emerald-400 text-xl">
                  Porcentaje de Avance
                </h1>
                <BarraProgreso proceso={proceso.proceso} />
              </div>

              <div className="flex w-full justify-center mt-2">
                <button
                  className="p-1 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700 hover:-translate-y-1 transition"
                  onClick={() => handleVerMas(proceso)}
                >
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalProceso
        open={showModalProceso}
        onClose={() => setShowModalProceso(false)}
        procesoId={procesoSeleccionadoId}
        procesos={procesos}
      />
    </div>
  );
}
