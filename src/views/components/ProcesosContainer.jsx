import { Search, Eye } from "lucide-react";
export default function ProcesosContainer({ procesos }) {
  return (
    <div className="w-full">
      <div className="mt-3 w-full  p-3 bg-gray-400/50 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-md">
            Procesos Totales:
            <span className="text-emerald-400 font-bold text-lg">
              {" " + procesos.length}
            </span>
          </p>
          <div className="flex p-1 gap-1 bg-gray-800/50 rounded-lg items-center mt-5 md:mt-0 md:w-auto">
            <Search />
            <input type="text" placeholder="Buscar Proceso" className="p-1" />
          </div>
        </div>
        <div className="mt-3"></div>
      </div>
    </div>
  );
}
