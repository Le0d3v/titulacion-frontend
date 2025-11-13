import StudentsTable from "../components/StudentsTable";
import useSWR from "swr";
import clienteAxios from "../../config/axios";
import Loader from "../components/Loader";

export default function Enginiers() {
  const fetcher = () =>
    clienteAxios("/api/students/ing").then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/students/ing", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Loader />;

  const datos = data.data;

  return (
    <>
      <div className="text-center text-3xl font-black">
        Estudiantes (Ingeniería)
      </div>
      <StudentsTable datos={datos} />
    </>
  );
}
