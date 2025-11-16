export default function Estado({ estado }) {
  const config = {
    0: { texto: "Pendiente", color: "bg-yellow-400" },
    1: { texto: "Completado", color: "bg-green-400" },
    2: { texto: "En Revisión", color: "bg-blue-400" },
    3: { texto: "Rechazado", color: "bg-red-400" },
  };

  const { texto, color } = config[estado] ?? {
    texto: "Desconocido",
    color: "bg-gray-400",
  };

  return (
    <span className={`p-1 ${color} text-white font-bold rounded-md`}>
      {texto}
    </span>
  );
}
