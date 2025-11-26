import CambiarPassword from "../components/CambiarPassword";
import DatosPersonales from "../components/DatosPersonales";
import { useStudentTour } from "../../hooks/useStudentTour";
import { Video } from "lucide-react";

export default function Settings() {
  const { configTour } = useStudentTour();

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
      <div className="mt-5 md:px-8 p-1">
        <DatosPersonales />
        <CambiarPassword />
      </div>
    </div>
  );
}
