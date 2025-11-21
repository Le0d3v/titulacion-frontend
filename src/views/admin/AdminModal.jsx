import { Info, Phone, User, Home, X } from "lucide-react";

export default function AdminModal({ open, onClose, admin }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white 
        rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-300 border border-gray-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full 
          shadow transition cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-emerald-500 text-white shadow">
            <Info className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Información del Administrador
          </h1>
        </div>
        <div className="space-y-6">
          <div className="border border-blue-300 bg-blue-50 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500 text-white rounded-full shadow">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-blue-700">
                Datos Personales
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["Nombre", admin.name],
                ["Apellido Paterno", admin.apellido_paterno],
                ["Apellido Materno", admin.apellido_materno],
                ["Fecha de Nacimiento", admin.fecha_nacimiento],
                ["CURP", admin.curp],
                ["RFC", admin.rfc],
                ["Género", admin.genero],
                ["Estado Civil", admin.estado_civil],
              ].map(([label, value], i) => (
                <div key={i}>
                  <label className="text-sm text-gray-600">{label}</label>
                  <div className="p-2 bg-blue-100 rounded-lg mt-1 border border-blue-200">
                    <p className="font-semibold text-gray-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-emerald-300 bg-emerald-50 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-500 text-white rounded-full shadow">
                <Home className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-emerald-700">
                Datos de Domicilio
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["Calle", admin.domicilio.calle],
                ["Número Exterior", admin.domicilio.numero_exterior],
                ["Número Interior", admin.domicilio.numero_interior],
                ["Colonia", admin.domicilio.colonia],
                ["Municipio", admin.domicilio.municipio],
                ["Estado", admin.domicilio.estado],
                ["Código Postal", admin.domicilio.codigo_postal],
                ["País", admin.domicilio.pais],
              ].map(([label, value], i) => (
                <div key={i}>
                  <label className="text-sm text-gray-600">{label}</label>
                  <div className="p-2 bg-emerald-100 rounded-lg mt-1 border border-emerald-200">
                    <p className="font-semibold text-gray-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-cyan-300 bg-cyan-50 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-cyan-500 text-white rounded-full shadow">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-cyan-700">
                Datos de Contacto
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["Teléfono", admin.telefono],
                ["Correo Electrónico", admin.email],
                ["Teléfono Emergencia 1", admin.telefono_emergencia_1],
                ["Teléfono Emergencia 2", admin.telefono_emergencia_2],
              ].map(([label, value], i) => (
                <div key={i}>
                  <label className="text-sm text-gray-600">{label}</label>
                  <div className="p-2 bg-cyan-100 rounded-lg mt-1 border border-cyan-200">
                    <p className="font-semibold text-gray-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow 
            hover:bg-blue-600 transition transformation hover:-translate-y-1 cursor-pointer"
          >
            <p>Cerrar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
