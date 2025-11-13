export default function Alerta({ children }) {
  return (
    <div className="my-2 bg-red-500 text-white font-bold p-3 uppercase rounded-lg border-l-6 border-red-700 text-sm w-auto">
      {children}
    </div>
  );
}
