import clienteAxios from "../../config/axios";
import useSWR from "swr";
import Loader from "../components/Loader";
import ProcesosContainer from "../components/ProcesosContainer";

export default function Processes() {
  const fetcher = () =>
    clienteAxios("/api/students/all").then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/students/all", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Loader />;

  const procesos = data.data;

  const procesosTsu = procesos.filter(
    (proceso) => proceso.datos_escolares.cuatrimestre == "6"
  );

  const procesosIng = procesos.filter(
    (proceso) => proceso.datos_escolares.cuatrimestre == "11"
  );

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-black">Procesos</h1>
        <p className="text-center mt-2 text-sm">
          Procesos Totales:{" "}
          <span className="text-md font-bold text-emerald-400">
            {procesos.length}
          </span>
        </p>
      </div>
      <div className="mt-3 w-full flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <h1 className="text-center text-xl font-bold">Procesos (TSU)</h1>
          <ProcesosContainer procesos={procesosTsu} />
        </div>
        <div className="w-full">
          <h1 className="text-center text-xl font-bold">
            Procesos (Ingeniería)
          </h1>
          <ProcesosContainer procesos={procesosIng} />
        </div>
      </div>
    </>
  );
}
