import { useAuth } from "../../hooks/useAuth";
import clienteAxios from "../../config/axios";
import useSWR from "swr";
import Loader from "../components/Loader";
import BarraProgreso from "../../views/components/BarraProgreso";

export default function MyProcess() {
  const { user } = useAuth({ middleware: "auth" });

  const fetcher = () =>
    clienteAxios(`/api/students/all/${user.id}`).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    user ? `/api/students/all/${user.id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const usuario = data ? data.data[0] : null;

  if (isLoading) return <Loader />;

  if (error) return <div>Error al cargar los datos.</div>;

  return (
    <>
      <div className="text-center text-3xl font-black">Mi Proceso</div>
      <div className="w-full my-3">
        {usuario && <BarraProgreso proceso={usuario.proceso} />}
      </div>
      <div className="mt-5">
        <h1 className="text-center font-bold text-xl">
          Actividades Correspondientes:
        </h1>
      </div>
    </>
  );
}
