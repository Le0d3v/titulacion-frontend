import { use, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import clienteAxios from "../../config/axios";
import Alerta from "../components/Alerta";
import { toast } from "react-toastify";
import { createRef } from "react";
import { Send, X, User, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function FormularioValidacion({ open, onClose, user, token }) {
  const [cargandoValidacion, setCargandoValidacion] = useState(false);
  const [erroresValidacion, setErroresValidacion] = useState([]);

  // Refs para cada campo, igual que usas en tus otros formularios
  const nameRef = createRef();
  const apPaternoRef = createRef();
  const apMaternoRef = createRef();
  const fechaNacimientoRef = createRef();
  const curpRef = createRef();
  const rfcRef = createRef();
  const generoRef = createRef();
  const estadoCivilRef = createRef();
  const emailRef = createRef();
  const telRef = createRef();
  const telEmergencia1Ref = createRef();
  const telEmergencia2Ref = createRef();

  if (!open) return null;

  const handleSubmitValidacion = async (e) => {
    e.preventDefault();
    setCargandoValidacion(true);

    const datos = {
      id: user.id,
      name: nameRef.current.value,
      apellido_paterno: apPaternoRef.current.value,
      apellido_materno: apMaternoRef.current.value,
      fecha_nacimiento: fechaNacimientoRef.current.value,
      curp: curpRef.current.value,
      rfc: rfcRef.current.value,
      genero: generoRef.current.value,
      estado_civil: estadoCivilRef.current.value,
      email: emailRef.current.value,
      telefono: telRef.current.value,
      telefono_emergencia_1: telEmergencia1Ref.current.value,
      telefono_emergencia_2: telEmergencia2Ref.current.value,
    };

    try {
      const { data } = await clienteAxios.put(
        `/api/students/all/${user.id}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setErroresValidacion([]);
      setCargandoValidacion(false);
      toast.success(data.message);
      onClose();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErroresValidacion(Object.values(error.response.data.errors));
      } else {
        toast.error("No se pudo conectar con el servidor externo");
        console.log(error);
      }

      setTimeout(() => setErroresValidacion([]), 5000);
      setCargandoValidacion(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-7xl p-6 rounded-xl shadow-xl text-black">
        {/* Encabezado */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-500">
            <User className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-black">
            Validar Datos Personales
          </h1>
        </div>

        {/* Descripción */}
        <div className="text-gray-700 my-3 text-center md:text-start md:flex md:gap-1">
          <p>
            Verifica que tus datos personales sean correctos y coincidan con tus
            documentos oficiales. Si hay datos que sno puedes modificar,
            contacta a
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

        {/* Errores */}
        {erroresValidacion.length > 0 && (
          <div className="my-3">
            {erroresValidacion.map((err, i) => (
              <Alerta key={i}>{err}</Alerta>
            ))}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmitValidacion} className="mt-5">
          {/* Bloque 1 */}
          <div className="flex flex-col lg:flex-row gap-5 my-5 w-full">
            <InputDato
              label="Nombre:"
              defaultValue={user.name}
              inputRef={nameRef}
            />
            <InputDato
              label="Apellido Paterno:"
              defaultValue={user.apellido_paterno}
              inputRef={apPaternoRef}
            />
            <InputDato
              label="Apellido Materno:"
              defaultValue={user.apellido_materno}
              inputRef={apMaternoRef}
            />
            <InputDato
              label="Fecha de Nacimiento:"
              defaultValue={user.fecha_nacimiento}
              type="date"
              inputRef={fechaNacimientoRef}
            />
          </div>

          {/* Bloque 2 */}
          <div className="flex flex-col lg:flex-row gap-5 my-5 w-full">
            <InputDato
              label="CURP:"
              defaultValue={user.curp}
              inputRef={curpRef}
            />
            <InputDato label="RFC:" defaultValue={user.rfc} inputRef={rfcRef} />
            <InputDato
              label="Género:"
              defaultValue={user.genero}
              inputRef={generoRef}
            />
            <InputDato
              label="Estado Civil:"
              defaultValue={user.estado_civil}
              inputRef={estadoCivilRef}
            />
          </div>

          {/* Bloque 3 */}
          <div className="flex flex-col lg:flex-row gap-5 my-7">
            <InputDato
              label="Correo Electrónico:"
              defaultValue={user.email}
              inputRef={emailRef}
            />
            <InputDato
              label="Número de Teléfono:"
              defaultValue={user.telefono}
              inputRef={telRef}
            />
            <InputDato
              label="Número Telefónico de Emergencia (1):"
              defaultValue={user.telefono_emergencia_1}
              inputRef={telEmergencia1Ref}
            />
            <InputDato
              label="Número Telefónico de Emergencia (2):"
              defaultValue={user.telefono_emergencia_2}
              inputRef={telEmergencia2Ref}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
          hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
            >
              <X size={18} /> Cancelar
            </button>

            <button
              type="submit"
              disabled={cargandoValidacion}
              className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer
          hover:bg-blue-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center w-22"
            >
              {cargandoValidacion ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <>
                  <Send size={18} /> Enviar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputDato({ label, defaultValue, inputRef, type = "text" }) {
  return (
    <div className="w-full">
      <label className="text-emerald-500 font-semibold">{label}</label>
      <input
        ref={inputRef}
        type={type}
        defaultValue={defaultValue}
        className="w-full mt-1 bg-gray-50 text-gray-900 border border-gray-300 p-2 rounded-lg focus:border-emerald-500 focus:ring-emerald-500"
      />
    </div>
  );
}
