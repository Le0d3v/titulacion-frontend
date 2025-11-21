export default function CartaExcencionPdf({ data }) {
  return (
    <div>
      <h1>ACTA DE EXENCIÓN DE EXAMEN PROFESIONAL</h1>
      <p>
        La Universidad Tecnológica de Huejotzingo manifiesta que, el C.
        <span class="font-bold">{data}</span>
        de la carrera de
        <span class="font-bold">{data}</span>
        con número de matrícula
        <span class="font-bold">{data}</span>
        presentó la Memoria de Estadía: "<span class="font-bold">{data}</span>
        ", cumpliendo satisfactoriamente con lo estipulado en la única opción de
        titulación.
      </p>
    </div>
  );
}
