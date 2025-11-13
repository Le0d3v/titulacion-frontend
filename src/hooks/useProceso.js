import { useEffect, useState } from "react";

export const useProceso = (procesos) => {
  const [porcentajes, setPorcentajes] = useState([]);
  const [actividadesCompletadas, setActividadesCompletadas] = useState([]);
  const [actividadesPendientes, setActividadesPendientes] = useState([]);

  const calcularDatosProceso = (proceso) => {
    const actividades = [
      "validacion_memoria_estadia",
      "encuesta_egresados",
      "validacion_datos_personales",
      "carga_imagen",
      "pago_donacion",
      "pago_titulo",
    ];

    const completadas = actividades.filter(
      (actividad) => proceso[actividad] === 1
    ).length;
    const totalActividades = actividades.length;
    const pendientes = totalActividades - completadas;

    const porcentajeCompletado = Math.round(
      (completadas / totalActividades) * 100
    );

    return {
      porcentajeCompletado,
      completadas,
      pendientes,
    };
  };

  useEffect(() => {
    if (procesos) {
      const nuevosDatos = procesos.map((proceso) =>
        calcularDatosProceso(proceso.proceso)
      );

      const nuevosPorcentajes = nuevosDatos.map(
        (data) => data.porcentajeCompletado
      );

      const nuevasCompletadas = nuevosDatos.map((data) => data.completadas);
      const nuevasPendientes = nuevosDatos.map((data) => data.pendientes);

      setPorcentajes(nuevosPorcentajes);
      setActividadesCompletadas(nuevasCompletadas);
      setActividadesPendientes(nuevasPendientes);
    }
  }, [procesos]);

  return {
    porcentajes,
    actividadesCompletadas,
    actividadesPendientes,
  };
};
