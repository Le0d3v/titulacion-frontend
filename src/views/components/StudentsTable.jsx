import { Eye, Search } from "lucide-react";
import { useState, useEffect } from "react";
import StudentModal from "./StudentModal";
import useTitulation from "../../hooks/useTitulation";

export default function StudentsTable({ datos }) {
  const [searchStudents, setSearchStudents] = useState(datos);
  const { modal, itemModal, openModal, closeModal } = useTitulation();

  useEffect(() => {
    setSearchStudents(datos);
  }, [datos]);

  const handleSearchStudent = (e) => {
    const query = e.target.value.toLowerCase();
    const students = datos.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.apellido_paterno.toLowerCase().includes(query) ||
        student.apellido_materno.toLowerCase().includes(query) ||
        student.datos_escolares.matricula.toLowerCase().includes(query) ||
        student.datos_escolares.carrera.toLowerCase().includes(query) ||
        student.datos_escolares.especialidad.toLowerCase().includes(query)
    );

    setSearchStudents(students);
  };

  return (
    <>
      <div className="mt-5 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-100 mt-5 md:mt-0">
          Estudiantes Totales:
          <span className="text-lg text-emerald-500 font-black">
            {" " + datos.length}
          </span>
        </p>
        <div className="flex p-1 gap-1 bg-gray-500/50 rounded-lg items-center mt-5 md:mt-0 md:w-auto">
          <Search />
          <input
            type="text"
            placeholder="Buscar Estudiante"
            className="p-1"
            onChange={handleSearchStudent}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="p-1">
          <table className="w-full overflow-x-scroll md:overflow-x-auto">
            <thead className="">
              <tr className=" bg-emerald-500 text-white rounded ">
                <th className="p-2">Nombre</th>
                <th className="p-2">Matricula</th>
                <th className="p-2">Carrera</th>
                <th className="p-2">Especialidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="">
              {searchStudents.map((student) => (
                <tr key={student.id}>
                  <td className="text-center py-4 border-b border-gray-500">
                    {student.name +
                      " " +
                      student.apellido_paterno +
                      " " +
                      student.apellido_materno}
                  </td>
                  <td className="text-center py-4 border-b border-gray-500">
                    {student.datos_escolares.matricula}
                  </td>
                  <td className="text-center py-4 border-b border-gray-500">
                    {student.datos_escolares.carrera}
                  </td>
                  <td className="text-center py-4 border-b border-gray-500">
                    {student.datos_escolares.especialidad}
                  </td>
                  <td className="py-2 border-b border-gray-500">
                    <div className="flex justify-center w-auto">
                      <button
                        type="button"
                        className="p-1 rounded bg-emerald-400 cursor-pointer hover:bg-emerald-500 transition-all hover:-translate-y-1 mx-auto font-bold flex gap-1"
                        onClick={() => {
                          openModal(student);
                        }}
                      >
                        <Eye />
                        <p>Ver Más</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <StudentModal
            open={modal}
            onClose={closeModal}
            student={itemModal}
          ></StudentModal>
        </div>
      </div>
    </>
  );
}
