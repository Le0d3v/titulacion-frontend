import StudentsTable from "../components/StudentsTable";
import clienteAxios from "../../config/axios";
import useSWR from "swr";
import { useState } from "react";
import Loader from "../components/Loader";

export default function Students() {
  const fetcher = () =>
    clienteAxios("/api/students/tsu").then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/students/tsu", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Loader />;

  const datos = data.data;

  return (
    <>
      <div className="text-center text-3xl font-black">Estudiantes (TSU)</div>
      <StudentsTable datos={datos} />
    </>
  );
}
