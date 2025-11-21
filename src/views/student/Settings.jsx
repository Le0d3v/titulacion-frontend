import CambiarPassword from "../components/CambiarPassword";
import DatosPersonales from "../components/DatosPersonales";

export default function Settings() {
  return (
    <div className="">
      <h1 className="text-center text-3xl font-black">Configuración</h1>
      <div className="mt-5 md:px-8 p-1">
        <DatosPersonales />
        <CambiarPassword />
      </div>
    </div>
  );
}
