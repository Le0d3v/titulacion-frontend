import { Info, Phone, School, User, Home, X } from "lucide-react";

export default function StudentModal({ open, onClose, student }) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50 justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Info className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Datos del Estudiante
            </h1>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer
              hover:-translate-y-1 transition hover:bg-gray-300"
          >
            <X className="text-black" />
          </button>
        </div>

        {/* Body con scroll */}
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh] space-y-8">
          {/* Datos personales */}
          <Section title="Datos Personales" icon={User} color="blue">
            <Grid>
              <Field label="Nombre" value={student.name} />
              <Field
                label="Apellido Paterno"
                value={student.apellido_paterno}
              />
              <Field
                label="Apellido Materno"
                value={student.apellido_materno}
              />
              <Field
                label="Fecha de Nacimiento"
                value={student.fecha_nacimiento}
              />
            </Grid>

            <Grid>
              <Field label="CURP" value={student.curp} />
              <Field label="RFC" value={student.rfc} />
              <Field label="Género" value={student.genero} />
              <Field label="Estado Civil" value={student.estado_civil} />
            </Grid>
          </Section>

          {/* Datos escolares */}
          <Section title="Datos Escolares" icon={School} color="purple">
            <Grid>
              <Field
                label="Matrícula"
                value={student.datos_escolares.matricula}
              />
              <Field label="Carrera" value={student.datos_escolares.carrera} />
              <Field
                label="Especialidad"
                value={student.datos_escolares.especialidad}
              />
            </Grid>

            <Grid>
              <Field
                label="Cuatrimestre"
                value={student.datos_escolares.cuatrimestre}
              />
              <Field label="Turno" value={student.datos_escolares.turno} />
              <Field label="Grupo" value={student.datos_escolares.grupo} />
            </Grid>
          </Section>

          {/* Domicilio */}
          <Section title="Domicilio" icon={Home} color="emerald">
            <Grid>
              <Field label="Calle" value={student.domicilio.calle} />
              <Field
                label="Número Exterior"
                value={student.domicilio.numero_exterior}
              />
              <Field
                label="Número Interior"
                value={student.domicilio.numero_interior}
              />
            </Grid>

            <Grid>
              <Field label="Colonia" value={student.domicilio.colonia} />
              <Field label="Municipio" value={student.domicilio.municipio} />
            </Grid>

            <Grid>
              <Field label="Estado" value={student.domicilio.estado} />
              <Field
                label="Código Postal"
                value={student.domicilio.codigo_postal}
              />
              <Field label="País" value={student.domicilio.pais} />
            </Grid>
          </Section>

          {/* Contacto */}
          <Section title="Contacto" icon={Phone} color="cyan">
            <Grid>
              <Field label="Teléfono" value={student.telefono} />
              <Field label="Correo" value={student.email} />
            </Grid>

            <Grid>
              <Field
                label="Teléfono Emergencia 1"
                value={student.telefono_emergencia_1}
              />
              <Field
                label="Teléfono Emergencia 2"
                value={student.telefono_emergencia_2}
              />
            </Grid>
          </Section>
          <div className="pt-2 pb-5 flex justify-center">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 
                transition hover:-translate-y-1 cursor-pointer"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, color, children }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-full ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {children}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500">{label}</label>
      <div className="mt-1 p-3 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-gray-800 font-semibold">{value}</p>
      </div>
    </div>
  );
}
