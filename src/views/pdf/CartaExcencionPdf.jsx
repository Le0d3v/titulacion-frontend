export default function CartaExcencionPdf({ usuario }) {
  return (
    <div
      style={{
        width: "800px", // ancho fijo
        minHeight: "1120px", // altura aprox. de una hoja A4
        padding: "60px", // suficiente padding
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "Times New Roman, serif",
        lineHeight: "1.6",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="/img/logo.png"
          alt="Logo Universidad"
          style={{ width: "120px", height: "auto" }}
        />
      </div>
      {/* Encabezado */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        UNIVERSIDAD TECNOLÓGICA DE HUEJOTZINGO
      </h1>
      <h2
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        ACTA DE EXENCIÓN DE TITULACIÓN
      </h2>
      s
      <p style={{ fontSize: "16px", textAlign: "justify" }}>
        La Universidad Tecnológica de Huejotzingo hace constar que el C.
        <span style={{ fontWeight: "bold" }}>
          {" " +
            usuario.name +
            " " +
            usuario.apellido_paterno +
            " " +
            usuario.apellido_materno}
        </span>
        , de la carrera de
        <span style={{ fontWeight: "bold" }}>
          {" " + usuario.datos_escolares.carrera}
        </span>
        , con número de matrícula
        <span style={{ fontWeight: "bold" }}>
          {" " + usuario.datos_escolares.matricula}
        </span>
        , presentó la Memoria de Estadía titulada "
        <span style={{ fontWeight: "bold" }}>[Nombre del Proyecto]</span>",
        cumpliendo satisfactoriamente con lo estipulado en la única opción de
        titulación.
      </p>
      <p style={{ fontSize: "16px", textAlign: "justify", marginTop: "20px" }}>
        Se expide la presente carta como constancia oficial para los fines
        académicos correspondientes, con validez dentro de la institución y ante
        las autoridades competentes.
      </p>
      <p style={{ fontSize: "16px", textAlign: "justify", marginTop: "20px" }}>
        Este documento se emite bajo la autorización de la Universidad y se
        encuentra registrado en los archivos académicos oficiales.
      </p>
      {/* Pie de página para firma */}
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p>__________________________________</p>
          <p>Firma del Responsable</p>
          <p style={{ fontWeight: "bold" }}>Nombre y Cargo</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>Fecha: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
