import { Info, Phone, User, Home } from "lucide-react";

export default function AdminModal({ open, onClose, admin }) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center p-10 justify-center z-50 bg-gray-900/70 transition-all duration-1000 w-auto md:p-12 overflow-auto ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-gray-100/95 rounded-lg p-5 shadow-lg transform transition-all duration-1000 text-black w-screen md:w-screen h-full md:h-auto ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <div className="w-full h-full">
          <div className="flex items-center gap-1">
            <div className="p-1 rounded-full bg-emerald-400 text-white">
              <Info className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-center text-black">
              Datos del Administrador
            </h1>
          </div>
          <div className="w-full p-[3px] bg-gray-700 my-1 rounded"></div>
        </div>
        <div className="mt-3 w-full rounded-xl max-h-80 overflow-y-auto">
          <div className="p-3 rounded-xl w-full text-white my-5 border-2 border-blue-500">
            <div className="flex gap-1 items-center">
              <div className="p-2 rounded-full bg-blue-500 text-white">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-2xl text-shadow-emerald-400 font-bold text-blue-500">
                Datos Personales
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">Nombre:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.name}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Apellido Paterno:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.apellido_paterno}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Apellido Materno:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-bold">
                  <p className="text-lg font-bold">{admin.apellido_materno}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">
                  Fecha de Nacimiento:
                </label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.fecha_nacimiento}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">CURP:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.curp}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">RFC:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.rfc}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Genero:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-bold">
                  <p className="text-lg font-bold">{admin.genero}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Estado Civil:</label>
                <div className="w-full p-2 bg-blue-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.estado_civil}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl w-full text-white my-5 border-2 border-emerald-500">
            <div className="flex gap-1 items-center">
              <div className="p-2 rounded-full bg-emerald-500 text-white">
                <Home className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-500">
                Datos de Domicilio
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">Calle:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.domicilio.calle}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Número Exterior:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">
                    {admin.domicilio.numero_exterior}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Número Interior:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-bold">
                  <p className="text-lg font-bold">
                    {admin.domicilio.numero_interior}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">Colonia:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.domicilio.colonia}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Municipio:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">
                    {admin.domicilio.municipio}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">Estado:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.domicilio.estado}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">Código Postal:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">
                    {admin.domicilio.codigo_postal}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">País:</label>
                <div className="w-full p-2 bg-emerald-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.domicilio.pais}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl w-full text-white my-5 border-2 border-cyan-500">
            <div className="flex gap-1 items-center">
              <div className="p-2 rounded-full bg-cyan-500 text-white">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-500">
                Datos de Contácto
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">
                  Número de Teléfono:
                </label>
                <div className="w-full p-2 bg-cyan-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.telefono}</p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">
                  Correo Electrónico:
                </label>
                <div className="w-full p-2 bg-cyan-600/70 rounded font-500">
                  <p className="text-lg font-bold">{admin.email}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 my-3 w-full">
              <div className="w-full">
                <label className="text-sm text-black">
                  Número de Teléfono de Emergencia (1):
                </label>
                <div className="w-full p-2 bg-cyan-600/70 rounded font-500">
                  <p className="text-lg font-bold">
                    {admin.telefono_emergencia_1}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-black">
                  Número de Teléfono de Emergencia (2):
                </label>
                <div className="w-full p-2 bg-cyan-600/70 rounded font-500">
                  <p className="text-lg font-bold">
                    {admin.telefono_emergencia_2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer hover:-translate-y-1 transition hover:shadow-lg w-full md:w-auto"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
