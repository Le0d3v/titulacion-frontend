export default function OfflinePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 p-4">
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 w-full max-w-sm text-center text-white shadow-xl border border-white/10">
        <div className="mx-auto flex items-center justify-center">
          <img src="/img/logo_dark.png" className="w-66" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4 w-full mt-1 text-center">
          Universidad Tecnológica de Huejotzingo
        </h1>

        <h1 className="text-xl font-semibold mb-3">Sin conexión</h1>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          No hay conexión a internet en este momento.
          <br />
          Cuando regrese la señal, volverás automáticamente al inicio.
        </p>

        <div className="animate-pulse text-emerald-400 font-medium">
          Esperando conexión...
        </div>
      </div>
    </div>
  );
}
