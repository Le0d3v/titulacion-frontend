export default function Comentarios({ comentarios }) {
  return (
    <div className="mt-5">
      <p className="font-bold text-gray-800 text-xl mb-1 mb-3">Comentarios:</p>
      {comentarios.length > 0 ? (
        <>
          <div className=" bg-cyan-200 p-3 rounded-lg border-2 border-cyan-500">
            <ul className="space-y-3 w-full max-h-66 overflow-y-scroll pr-2">
              {comentarios.map((comentario) => (
                <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between gap-5">
                  <p className="font-semibold text-gray-700 md:w-5/7 w-2/3">
                    {comentario.comentario}
                  </p>
                  <p className="text-sm text-gray-500 w-1/3 md:w-2/7">
                    {new Date(comentario.created_at).toLocaleString("es-MX", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="bg-cyan-200 p-5 rounded-lg border-2 border-cyan-500">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between gap-5">
            <p>Sin comentarios</p>
          </div>
        </div>
      )}
    </div>
  );
}
