import DeleteAcount from "../components/DeleteAcount";
import CambiarPassword from "../components/CambiarPassword";
import DatosPersonales from "../components/DatosPersonales";
import { useAdminTour } from "../../hooks/useAdminTour";
import { Video } from "lucide-react";

export default function Setings() {
  const { configTour } = useAdminTour();

  return (
    <div className="">
      <h1 className="text-center text-3xl font-black" id="config-header-admin">
        Configuración
      </h1>
      <div className="flex w-full justify-end px-5">
        <button
          onClick={() => {
            configTour().drive();
          }}
          id="tutorial-config-admin"
          className="p-2 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-500 
                      flex gap-1 hover:-translate-y-1 transition"
        >
          <Video />
          <p>Tutorial</p>
        </button>
      </div>
      <div className="mt-5 px-8">
        <DatosPersonales />
        <CambiarPassword />
        <DeleteAcount />
      </div>
    </div>
  );
}
