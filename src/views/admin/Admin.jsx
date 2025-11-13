import { Eye, Search } from "lucide-react";
import clienteAxios from "../../config/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import useTitulation from "../../hooks/useTitulation";
import AdminModal from "../components/AdminModal";

export default function Admin() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const { modal, itemModal, openModal, closeModal } = useTitulation();
  const [searchAdmins, setSearchAdmins] = useState([]);
  const fetcher = () => clienteAxios("/api/admins").then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/admins", fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      setSearchAdmins(data.data);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  const admins = data.data;

  const handleSearchAdmin = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredAdmins = admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(query) ||
        admin.matricula.toLowerCase().includes(query)
    );
    setSearchAdmins(filteredAdmins);
  };

  return (
    <>
      <div className="text-center text-3xl font-black">Administradores</div>
      <div className="mt-5 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-100 mt-5 md:mt-0">
          Administradores Totales:
          <span className="text-lg text-emerald-500 font-black">
            {" " + admins.length}
          </span>
        </p>
        <div className="flex p-1 gap-1 bg-gray-500/50 rounded-lg items-center mt-5 md:mt-0 md:w-auto">
          <Search />
          <input
            type="text"
            placeholder="Buscar Estudiante"
            className="p-1"
            onChange={handleSearchAdmin}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="p-1">
          <table className="w-full overflow-x-scroll md:overflow-x-auto">
            <thead>
              <tr className="bg-emerald-500 text-white rounded">
                <th className="p-2">Nombre</th>
                <th className="p-2">Matricula</th>
                <th className="p-2">Correo Electrónico</th>
                <th className="p-2">Teléfono</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {searchAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td className="text-center py-4 border-b border-gray-500">
                    {admin.name +
                      " " +
                      admin.apellido_paterno +
                      " " +
                      admin.apellido_materno}
                  </td>
                  <td className="text-center py-4 border-b border-gray-500">
                    {admin.matricula}
                  </td>
                  <td className="text-center py-4 border-b border-gray-500">
                    {admin.email}
                  </td>
                  <td className="text-center py-4 border-b border-gray-500">
                    {admin.telefono}
                  </td>
                  <td className="py-2 border-b border-gray-500">
                    <div className="flex justify-center w-auto">
                      <button
                        type="button"
                        className="p-1 rounded bg-emerald-400 cursor-pointer hover:bg-emerald-500 transition-all hover:-translate-y-1 mx-auto font-bold flex gap-1"
                        onClick={() => {
                          openModal(admin);
                        }}
                      >
                        <Eye />
                        <p>Ver Más</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminModal
            open={modal}
            onClose={closeModal}
            admin={itemModal}
          ></AdminModal>
        </div>
      </div>
    </>
  );
}
