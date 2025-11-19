import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";
import { Send, X, ClipboardList, CircleCheck } from "lucide-react";

export default function Encuesta({ open, onClose, user, token }) {
  const [cargandoEncuesta, setCargandoEncuesta] = useState(false);
  const [erroresEncuesta, setErroresEncuesta] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    setPagina(1);
  }, []);

  if (!open) return null;

  const handleSubmitEncuesta = async (e) => {
    e.preventDefault();
    setCargandoEncuesta(true);

    const datos = {
      id: user.id,
    };

    try {
      const { data } = await clienteAxios.post(
        `/api/proceso/encuesta/update`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setErroresEncuesta([]);
      setCargandoEncuesta(false);
      toast.success(data.message);
      onClose();
    } catch (error) {
      setErroresEncuesta(Object.values(error.response.data.errors));
      setCargandoEncuestasetErroresEncuesta(false);

      setTimeout(() => setErroresReferencia([]), 5000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 bg-opacity-60 flex items-center justify-center z-50 md:px-44">
      <div
        className="bg-white w-full max-w-7xl p-6 rounded-xl shadow-xl text-black 
       max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-500">
            <ClipboardList className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-black">
            Encuesta de Egresados
          </h1>
        </div>
        {erroresEncuesta.length > 0 && (
          <div className="my-3">
            {erroresEncuesta.map((err, i) => (
              <Alerta key={i}>{err}</Alerta>
            ))}
          </div>
        )}
        {user.proceso.encuesta_egresados === 0 ? (
          <>
            <p className="text-gray-700 my-3 text-center md:text-start">
              Contesta cada una de las preguntas con total sinceridad, tu
              identidad será anónima.
            </p>
            <form onSubmit={handleSubmitEncuesta} className="mt-5">
              {pagina === 1 && (
                <>
                  <Pregunta
                    title="1. ¿Actualmente te encuentras trabajando?"
                    name="trabajando"
                    opciones={[
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  <Pregunta
                    title="2. ¿El empleo que tienes está relacionado con tu carrera?"
                    name="relacion_carrera"
                    opciones={[
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  <Pregunta
                    title="3. ¿En qué tiempo conseguiste tu primer empleo después de egresar?"
                    name="tiempo_empleo"
                    opciones={[
                      { value: "menor3", label: "Menos de 3 meses" },
                      { value: "3a6", label: "Entre 3 y 6 meses" },
                      { value: "mas6", label: "Más de 6 meses" },
                      { value: "no_empleo", label: "Aún no consigo empleo" },
                    ]}
                  />
                  <Pregunta
                    title="4. ¿Cuál fue la modalidad de contratación de tu empleo actual?"
                    name="modalidad"
                    opciones={[
                      { value: "tiempo_completo", label: "Tiempo completo" },
                      { value: "medio_tiempo", label: "Medio tiempo" },
                      { value: "practicas", label: "Prácticas / Residencias" },
                      { value: "no_trabajo", label: "No trabajo actualmente" },
                    ]}
                  />
                  <Pregunta
                    title="5. ¿Qué tan satisfecho estás con la formación recibida en la universidad?"
                    name="satisfaccion"
                    opciones={[
                      { value: "muy_satisfecho", label: "Muy satisfecho" },
                      { value: "satisfecho", label: "Satisfecho" },
                      { value: "poco_satisfecho", label: "Poco satisfecho" },
                      { value: "insatisfecho", label: "Insatisfecho" },
                    ]}
                  />
                </>
              )}

              {pagina === 2 && (
                <>
                  <Pregunta
                    title="6. ¿Consideras que tu carrera tiene buena demanda laboral?"
                    name="demanda"
                    opciones={[
                      { value: "alta", label: "Alta" },
                      { value: "media", label: "Media" },
                      { value: "baja", label: "Baja" },
                    ]}
                  />
                  <Pregunta
                    title="7. ¿Volverías a elegir la misma carrera?"
                    name="volver_elegir"
                    opciones={[
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  <Pregunta
                    title="8. ¿Qué tan útil fue tu residencia profesional para tu desarrollo laboral?"
                    name="util_residencia"
                    opciones={[
                      { value: "muy_util", label: "Muy útil" },
                      { value: "util", label: "Útil" },
                      { value: "poco_util", label: "Poco útil" },
                      { value: "nada_util", label: "Nada útil" },
                    ]}
                  />
                  <Pregunta
                    title="9. ¿Consideras que los docentes estaban bien preparados?"
                    name="preparacion_docente"
                    opciones={[
                      { value: "siempre", label: "Siempre" },
                      { value: "casi_siempre", label: "Casi siempre" },
                      { value: "a_veces", label: "A veces" },
                      { value: "nunca", label: "Nunca" },
                    ]}
                  />
                  <Pregunta
                    title="10. ¿Qué tan preparado te sientes para competir en el mercado laboral?"
                    name="preparacion_laboral"
                    opciones={[
                      { value: "muy_preparado", label: "Muy preparado" },
                      { value: "preparado", label: "Preparado" },
                      { value: "poco_preparado", label: "Poco preparado" },
                      { value: "nada_preparado", label: "Nada preparado" },
                    ]}
                  />
                </>
              )}
              <div className="flex justify-between mt-6">
                {pagina > 1 && (
                  <button
                    type="button"
                    onClick={() => setPagina(pagina - 1)}
                    className="px-3 py-1 rounded bg-gray-500 text-white font-bold hover:bg-gray-600 transition cursor-pointer hover:-translate-y-1"
                  >
                    ← Anterior
                  </button>
                )}
                {pagina < 2 && (
                  <div className="flex w-full justify-end">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                  hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
                      >
                        <X size={18} /> Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => setPagina(pagina + 1)}
                        className="ml-auto px-3 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition cursor-pointer hover:-translate-y-1"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                )}
                {pagina === 2 && (
                  <div className="flex gap-1">
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
                      disabled={cargandoEncuesta}
                      className="px-2 py-1 rounded bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 
                    hover:-translate-y-1 transition flex gap-1 items-center justify-center w-26"
                    >
                      {cargandoEncuesta ? (
                        <ClipLoader color="#ffffff" size={24} />
                      ) : (
                        <>
                          <Send size={18} /> Enviar
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </>
        ) : (
          <>
            <div
              className="my-2 px-2 py-3 bg-green-400 text-white font-bold uppercase border-l-8 border-green-600 
              rounded-lg w-66 flex gap-2 items-center"
            >
              <CircleCheck size={25} />
              <p>Ya has respondido</p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer
                hover:bg-red-600 hover:-translate-y-1 transition flex gap-1 items-center justify-center"
              >
                <X size={18} /> Cerrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Pregunta({ title, name, opciones }) {
  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow">
      <p className="font-semibold text-gray-800 mb-2">{title}</p>
      <div className="space-y-1 text-gray-700">
        {opciones.map((op, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={op.value}
              className="text-blue-600"
              required
            />
            {op.label}
          </label>
        ))}
      </div>
    </div>
  );
}
