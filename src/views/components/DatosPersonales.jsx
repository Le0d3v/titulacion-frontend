import { ExternalLink, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function DatosPersonales() {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <div className="border-gray-400 border-2 w-full p-3 rounded-xl mb-7">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-500/70">
          <User className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">Datos Personales</h1>
      </div>
      <div className="text-gray-300 my-3 text-center md:text-start md:flex md:gap-1">
        <p>
          Si algún dato es incorrecto, intenta modificarlo en la Validación de
          Datos Personales o contacta con
        </p>
        <span className="text-emerald-400 font-semibold flex justify-center md:justify-start gap-1">
          <NavLink
            className="flex hover:cursor-pointer hover:underline hover:text-emerald-500"
            to="https://www.uth.edu.mx/index.php/servicios/alumnos/contacto"
          >
            <p>Servicios Escolares</p>
            <ExternalLink className="w-4 h-4" />
          </NavLink>
        </span>
      </div>
      <div className="mt-5">
        <div className="flex flex-col lg:flex-row gap-5 my-5 w-full">
          {user ? (
            <>
              <UserData label="Nombre:" value={user.name} />
              <UserData
                label="Apellido Paterno:"
                value={user.apellido_paterno}
              />
              <UserData
                label="Apellido Materno:"
                value={user.apellido_materno}
              />
              <UserData
                label="Fecha de Nacimiento:"
                value={user.fecha_nacimiento}
              />
            </>
          ) : (
            <p className="text-lg font-bold text-red-500">
              Usuario no autenticado
            </p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-5 my-5 w-full">
          {user ? (
            <>
              <UserData label="CURP:" value={user.curp} />
              <UserData label="RFC:" value={user.rfc} />
              <UserData label="Matrícula:" value={user.matricula} />
              <UserData label="Género:" value={user.genero} />
              <UserData label="Estado Civil:" value={user.estado_civil} />
            </>
          ) : (
            <p className="text-lg font-bold text-red-500">
              Usuario no autenticado
            </p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-5 my-7">
          {user ? (
            <>
              <UserData label="Correo Electrónico:" value={user.email} />
              <UserData label="Número de Teléfono:" value={user.telefono} />
              <UserData
                label="Número Telefónico de Emergencia (1):"
                value={user.telefono_emergencia_1}
              />
              <UserData
                label="Número telefónico de Emergencia (2):"
                value={user.telefono_emergencia_2}
              />
            </>
          ) : (
            <p className="text-lg font-bold text-red-500">
              Usuario no autenticado
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const UserData = ({ label, value }) => (
  <div className="w-full">
    <label className="text-sm text-gray-300">{label}</label>
    <div className="w-full p-2 bg-emerald-600/50 rounded font-500">
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);
