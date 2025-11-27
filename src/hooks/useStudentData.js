import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useAuth } from "./useAuth";

export const useStudentData = () => {
  const { user } = useAuth({ middleware: "auth" });

  const shouldFetch = Boolean(user?.id);

  const fetcher = () =>
    clienteAxios(`/api/students/all/${user.id}`).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/students/all/${user.id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  return {
    data,
    usuario: data?.data?.[0],
    error,
    isLoading,
  };
};
