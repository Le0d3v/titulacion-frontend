import DeleteAcount from "../components/DeleteAcount";
import CambiarPassword from "../components/CambiarPassword";
import DatosPersonales from "../components/DatosPersonales";

export default function Setings() {
  return (
    <div className="">
      <h1 className="text-center text-3xl font-black">Configuración</h1>
      <div className="mt-5 px-8">
        <DatosPersonales />
        <CambiarPassword />
        <DeleteAcount />
      </div>
    </div>
  );
}
