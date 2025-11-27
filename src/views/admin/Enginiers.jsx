import StudentsTable from "../components/StudentsTable";
import useSWR from "swr";
import clienteAxios from "../../config/axios";
import Loader from "../components/Loader";
import { useAdminTour } from "../../hooks/useAdminTour";
import { Video } from "lucide-react";

export default function Enginiers() {
  const { studentsTour } = useAdminTour();
  const fetcher = () =>
    clienteAxios("/api/students/ing").then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/students/ing", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Loader />;

  const datos = data.data;

  return (
    <>
      <div className="text-center text-3xl font-black" id="estudiantes-header">
        Estudiantes (Ingeniería)
      </div>
      <div className="flex w-full justify-center md:justify-end px-5 mt-5 md:mt-0">
        <button
          onClick={() => {
            studentsTour().drive();
          }}
          id="tutorial-estudiantes"
          className="p-2 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-500 
                flex gap-1 hover:-translate-y-1 transition"
        >
          <Video />
          <p>Tutorial</p>
        </button>
      </div>
      <StudentsTable datos={datos} />
    </>
  );
}
