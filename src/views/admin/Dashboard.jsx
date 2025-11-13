import {
  CircleAlert,
  CircleCheck,
  GraduationCap,
  HardHat,
  Lock,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PieChart from "../components/PieChart";
import clienteAxios from "../../config/axios";

export default function Dashboard() {
  const [tsu, setTsu] = useState([]);
  const [ing, setIng] = useState([]);
  const [procesosIng, setProcesosIng] = useState([]);
  const [procesosTsu, setProcesosTsu] = useState([]);
  const [admins, setAdmins] = useState([]);

  const obtenerTsu = async () => {
    try {
      const { data } = await clienteAxios("/api/students/tsu");
      setTsu(data.data);

      // Establecer los datos filtrados en procesosTsu
      setProcesosTsu(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerIng = async () => {
    try {
      const { data } = await clienteAxios("/api/students/ing");
      setIng(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerAdmins = async () => {
    try {
      const { data } = await clienteAxios("/api/admins");
      setAdmins(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTsu();
    obtenerIng();
    obtenerAdmins();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl font-black">
        Panel de Administración
      </h1>
      <p className="text-center text-sm text-gray-300 mt-2">
        Bienvenido al Sistema de Gestión de Titulación
      </p>
      <div className="w-full flex flex-col md:flex-row gap-5 mt-3 md:mt-5 px-10 py-5 md:p-5">
        <div className="w-full p-3 bg-blue-400  rounded-xl">
          <div className="flex justify-center p-1">
            <GraduationCap className="w-14 h-14" />
          </div>
          <h1 className="text-md text-center">Estudiantes Totales</h1>
          <p className="text-center font-black text-6xl mt-1">
            {tsu.length + ing.length}
          </p>
          <div className="flex justify-center mt-5">
            <NavLink
              to={"/admin/students"}
              className="p-2 rounded bg-blue-600 hover:bg-blue-800 cursor-pointer hover:-translate-y-1 transition-all"
            >
              Ver Más
            </NavLink>
          </div>
        </div>
        <div className="w-full p-3 bg-emerald-400 500 rounded-xl">
          <div className="flex justify-center p-1">
            <User className="w-14 h-14" />
          </div>
          <h1 className="text-md text-center">TSUs Totales</h1>
          <p className="text-center font-black text-6xl mt-1">{tsu.length}</p>
          <div className="flex justify-center mt-7 md:mt-5">
            <NavLink
              to={"/admin/students"}
              className="p-2 rounded bg-emerald-600 hover:bg-emerald-800 cursor-pointer hover:-translate-y-1 transition-all"
            >
              Ver Más
            </NavLink>
          </div>
        </div>
        <div className="w-full p-3 bg-purple-400  rounded-xl">
          <div className="flex justify-center p-1">
            <HardHat className="w-14 h-14" />
          </div>
          <h1 className="text-md text-center">Ingenierías Totales</h1>
          <p className="text-center font-black text-6xl mt-1">{ing.length}</p>
          <div className="flex justify-center mt-5">
            <NavLink
              to={"/admin/enginiers"}
              className="p-2 rounded bg-purple-600 hover:bg-purple-800 cursor-pointer hover:-translate-y-1 transition-all"
            >
              Ver Más
            </NavLink>
          </div>
        </div>
        <div className="w-full p-3 bg-red-400 rounded-xl">
          <div className="flex justify-center p-1">
            <Lock className="w-14 h-14" />
          </div>
          <h1 className="text-md text-center">Administradores Totales</h1>
          <p className="text-center font-black text-6xl mt-1">
            {admins.length}
          </p>
          <div className="flex justify-center mt-5">
            <NavLink
              to={"/admin/admins"}
              className="p-2 rounded bg-red-600 hover:bg-red-800 cursor-pointer hover:-translate-y-1 transition-all"
            >
              Ver Más
            </NavLink>
          </div>
        </div>
      </div>
      <div className="mt-5 p-5 md:p-1">
        <h1 className="text-center  text-2xl font-bold">Procesos</h1>
        <div className="flex flex-col md:flex-row gap-5 w-full mt-3">
          <div className="w-full bg-gray-100/30 rounded-2xl p-3 ">
            <h1 className="text-center font-bold text-xl">TSU</h1>
            <div>
              <div className="mt-3 flex flex-col md:flex-row gap-5 p-1">
                <div className="p-3 rounded bg-white w-full text-black">
                  <div className="flex justify-center">
                    <GraduationCap className="w-10 h-10 text-blue-400" />
                  </div>
                  <h2 className="text-sm font-bold text-center">
                    Procesos <span className="md:block inline">Totales</span>
                  </h2>
                  <div className="flex justify-center">
                    <span className="text-4xl font-black text-center text-blue-400">
                      {tsu.length}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded bg-white w-full text-black">
                  <div className="flex justify-center">
                    <CircleCheck className="w-10 h-10 text-green-400" />
                  </div>
                  <h2 className="text-sm font-bold text-center">
                    Procesos Completados
                  </h2>
                  <div className="flex justify-center">
                    <span className="text-4xl font-black text-center text-green-400">
                      47
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded bg-white w-full text-black">
                  <div className="flex justify-center">
                    <CircleAlert className="w-10 h-10 text-yellow-400" />
                  </div>
                  <h2 className="text-sm font-bold text-center">
                    Procesos Pendientes
                  </h2>
                  <div className="flex justify-center">
                    <span className="text-4xl font-black text-center text-yellow-400">
                      265
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-1 p-3">
                <h1 className="text-center font-bold my-1">
                  Gráfico de Procesos
                </h1>
                <div className="w-full flex justify-center">
                  <div className="w-96">
                    <PieChart pendientes={265} completados={47} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-100/30 rounded-2xl p-3 ">
            <h1 className="text-center font-bold text-xl">Ingeniería</h1>
            <div className="mt-3 flex flex-col md:flex-row gap-5 p-1">
              <div className="p-3 rounded bg-white w-full text-black">
                <div className="flex justify-center">
                  <GraduationCap className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-sm font-bold text-center">
                  Procesos <span className="md:block inline">Totales</span>
                </h2>
                <div className="flex justify-center">
                  <span className="text-4xl font-black text-center text-blue-400">
                    {ing.length}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded bg-white w-full text-black">
                <div className="flex justify-center">
                  <CircleCheck className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-sm font-bold text-center">
                  Procesos Completados
                </h2>
                <div className="flex justify-center">
                  <span className="text-4xl font-black text-center text-green-400">
                    356
                  </span>
                </div>
              </div>
              <div className="p-3 rounded bg-white w-full text-black">
                <div className="flex justify-center">
                  <CircleAlert className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-sm font-bold text-center">
                  Procesos Pendientes
                </h2>
                <div className="flex justify-center">
                  <span className="text-4xl font-black text-center text-yellow-400">
                    76
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-1 p-3">
              <h1 className="text-center font-bold my-1">
                Gráfico de Procesos
              </h1>
              <div className="w-full flex justify-center">
                <div className="w-96">
                  <PieChart pendientes={76} completados={346} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
