import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useAdminTour = () => {
  const dashboardTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por el Dashboard",
            description:
              "Sigue estos pasos para conocer tu dashboard principal y sus componentes.",
          },
        },
        {
          element: "#dashboard-header",
          popover: {
            title: "Header",
            description:
              "Utiliza el Header para corroborar que te encuentres en la sección correcta.",
          },
        },
        {
          element: "#tutorial-dashboard",
          popover: {
            title: "Iniciar Tour",
            description:
              "Inicia este tour las veces que lo necesites utilziando este botón.",
          },
        },
        {
          element: "#dashboard-main",
          popover: {
            title: "Conteo genérico",
            description:
              "Visualiza la cantidad de registros totales en estos cards.",
          },
        },
        {
          element: "#vermas-link",
          popover: {
            title: "Ver Más",
            description:
              "Pulsa el botón para navegar a secciones con más información.",
          },
        },
        {
          element: "#dashboard-tsu",
          popover: {
            title: "Procesos (TSU)",
            description:
              "Visualiza información genérica sobre los procesos de titulación en TSU",
          },
        },
        {
          element: "#dashboard-ing",
          popover: {
            title: "Procesos (Ingeniería)",
            description:
              "Visualiza información genérica sobre los procesos de titulación en Ingeniería",
          },
        },
        {
          element: "#grafica-tsu",
          popover: {
            title: "Gráfica de Procesos (TSU)",
            description:
              "Visualiza información de manera más gráfica con este gráfico.",
          },
        },
        {
          element: "#grafica-ing",
          popover: {
            title: "Gráfica de Procesos (Ingeniería)",
            description:
              "Visualiza información de manera más gráfica con este gráfico.",
          },
        },
      ],
    });

    return tour;
  };

  const layoutTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#start",
          popover: {
            title: "Tour por el Layout",
            description:
              "Sigue los pasos para conocer la estructura de la aplicación y sus principales componentes.",
          },
        },
        {
          element: "#header",
          popover: {
            title: "Header",
            description:
              "Aquí encontrarás el nombre de la insttución y algunos botónes importantes.",
          },
        },
        {
          element: "#tutorial-layout",
          popover: {
            title: "Iniciar Tour",
            description:
              "Puedes ejecutar este tour las veces que quieras utilizando este botón.",
          },
        },
        {
          element: "#boton-cerrar-sesion",
          popover: {
            title: "Cerrar Sesión",
            description:
              "Utiliza el botón con la leyenda 'Cerrar Sesión' para cerrar tu sesión y volver al inicio.",
          },
        },
        {
          element: "#navegacion",
          popover: {
            title: "Navegación",
            description:
              "Utiliza La navegación para moverte por las distintas secciones de la aplicación.",
          },
        },
        {
          element: "#layout-user",
          popover: {
            title: "Usuario",
            description:
              "Aquí verás tu nombre de usuario. Puedes usarlo para comprobar que eres tú.",
          },
        },
        {
          element: "#admin-outlet",
          popover: {
            title: "Contenido",
            description:
              "Aquí verás el contenido relacionado a la sección que visites dentro de la app.",
          },
        },
      ],
    });

    return tour;
  };

  const procesosTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por la sección de Procesos",
            description:
              "En este tour conocerás el funcionamiento de la gestión de procesos.",
          },
        },
        {
          element: "#procesos-header",
          popover: {
            title: "Header",
            description:
              "Usa el Header para comprobar que te encuentres en la sección correcta.",
          },
        },
        {
          element: "#procesos-total",
          popover: {
            title: "Procesos totales",
            description: "Consulta el número total de procesos.",
          },
        },
        {
          element: "#tutorial-procesos",
          popover: {
            title: "Iniciar Tour",
            description:
              "Si olvidas alguna funcionalidad, utilizia este botón para realizar este tour.",
          },
        },
        {
          element: "#proceso-container",
          popover: {
            title: "Prcoesos",
            description:
              "Consulta los procesos clasificados por periodo (TSU / Ingeniería)",
          },
        },
        {
          element: "#proceso-container-total",
          popover: {
            title: "Subtotal de procesos",
            description: "Consulta el total de procesos (TSU / Ingeniería)",
          },
        },
        {
          element: "#proceso-container-buscador",
          popover: {
            title: "Buscar un Proceso",
            description:
              "Busca un proceso en específico ingresando datos del estudiante. (nombre, matricula, carrera.).",
          },
        },
        {
          element: "proceso-card-1",
          popover: {
            title: "Proceso",
            description:
              "Cada card contiene un proceso completo con toda su información",
          },
        },
      ],
    });

    return tour;
  };

  const studentsTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por la sección de Estudiantes",
            description:
              "Sigue este tour para conocer la gestión de estudiantes.",
          },
        },
        {
          element: "#estudiantes-header",
          popover: {
            title: "Header",
            description:
              "Utiliza el header para comprobar que te localices en la sección correcta.",
          },
        },
        {
          element: "#tutorial-estudiantes",
          popover: {
            title: "Iniciar Tour",
            description:
              "Utiliza el botón para iniciar el tour las veces que lo necesites.",
          },
        },
        {
          element: "#estudiantes-total",
          popover: {
            title: "Estudiantes Totales",
            description:
              "Consulta el número total de estudiantes en este periodo.",
          },
        },
        {
          element: "#buscador-estudiantes",
          popover: {
            title: "Buscar un Estudiante",
            description:
              "Filtra tus registros buscándolos por nombre, matricula, carrera o especialidad.",
          },
        },
        {
          element: "#estudiantes-tabla",
          popover: {
            title: "Tabla de Estudiantes",
            description:
              "Visualiza cada estudiante y sus datos a través de esta tabla.",
          },
        },
        {
          element: "#estudiantes-contenedor tr:nth-child(1)",
          popover: {
            title: "Registro",
            description:
              "Cada fila representa un registro, mostrando la información más relevante del estudiante",
          },
        },
        {
          element:
            "#estudiantes-contenedor tr:nth-child(1) #ver-mas-estudiante",
          popover: {
            title: "Ver Más",
            description:
              "Accede a toda la información del estudiante dando click al botón",
          },
        },
        {
          element: "#estudiante-modal",
          popover: {
            title: "Modal de Estudiante",
            description:
              "En este modal podrás ver toda la información del Estudiante",
          },
        },
      ],
    });

    return tour;
  };

  const adminsTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por la sección de Administradores",
            description:
              "Completa este tour para conocer la gestión de Administradores.",
          },
        },
        {
          element: "#admins-header",
          popover: {
            title: "Header",
            description:
              "Utiliza el header para comprobar que te localices en la sección correcta.",
          },
        },
        {
          element: "#tutorial-admins",
          popover: {
            title: "Iniciar Tour",
            description:
              "Utiliza el botón para iniciar el tour las veces que lo necesites.",
          },
        },
        {
          element: "#total-admins",
          popover: {
            title: "Administradores Totales",
            description:
              "Consulta el número total de administradores en el sistema.",
          },
        },
        {
          element: "#buscador-admins",
          popover: {
            title: "Buscar un Administrador",
            description:
              "Filtra tus registros buscándolos por nombre, matricula, o datos de contacto.",
          },
        },
        {
          element: "#admins-tabla",
          popover: {
            title: "Tabla de Administradores",
            description:
              "Visualiza cada administrador y sus datos a través de esta tabla.",
          },
        },
        {
          element: "#admins-contenedor tr:nth-child(1)",
          popover: {
            title: "Registro",
            description:
              "Cada fila representa un registro, mostrando la información más relevante del estudiante",
          },
        },
        {
          element: "#admins-contenedor tr:nth-child(1) #ver-mas-admin",
          popover: {
            title: "Ver Más",
            description:
              "Accede a toda la información del estudiante dando click al botón",
          },
        },
      ],
    });

    return tour;
  };

  const configTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por la sección de Configuración",
            description:
              "Completa este tour para conocer la gestión de Administradores.",
          },
        },
        {
          element: "#config-header-admin",
          popover: {
            title: "Header",
            description:
              "Utiliza el header para comprobar que te localices en la sección correcta.",
          },
        },
        {
          element: "#tutorial-config-admin",
          popover: {
            title: "Iniciar Tour",
            description:
              "Arranca este tutorial las veces que lo necesites con este botón.",
          },
        },
        {
          element: "#datos-personales",
          popover: {
            title: "Datos Personales",
            description: "Visualiza tus datos personales en esta sección.",
          },
        },
        {
          element: "#sa-link",
          popover: {
            title: "Link a Servicios Escolares",
            description:
              "Si lo necesitas, puedes acceder a Servicios Escolares dando click al enlace.",
          },
        },
        {
          element: "#cambiar-password",
          popover: {
            title: "Cambiar Contraseña",
            description:
              "En este formulario podrás cambiar la contraseña con la que inicias sesión al inicio de la aplicación.",
          },
        },
        {
          element: "#cambiar-password-input",
          popover: {
            title: "Ingreso de datos",
            description:
              "Coloca la información solicitada en cada campo para modificar tu contraseña.",
          },
        },
        {
          element: "#ver-password",
          popover: {
            title: "Ver Password",
            description:
              "Da click al botón para ver u ocultar el contenido que ingresas.",
          },
        },
        {
          element: "#boton-cambiar-passwor",
          popover: {
            title: "Actualizar Contraseña",
            description:
              "Cuando hayas llenado todos los campos pulsa este botón para modificar tu contraseña.",
          },
        },
        {
          element: "#eliminar-cuenta",
          popover: {
            title: "Eliminar Cuenta",
            description:
              "Puedes Eliminar tu cuenta (si lo necesitas) llenando el formulario.",
          },
        },
        {
          element: "#advertencia",
          popover: {
            title: "Advertencia",
            description:
              "Lee la información antes de realizar cualquier acción, para evitar cambios irreversibles.",
          },
        },
        {
          element: "#eliminar-cuenta-input",
          popover: {
            title: "Ingreso de Datos",
            description:
              "Al igual que con la contraseña, llena los campos solicitados para realizar el proceso.",
          },
        },
        {
          element: "#eliminar-cuenta-boton",
          popover: {
            title: "Eliminar Cuenta",
            description:
              "Cuando termines de llenar correctamente los datos solicitados, da click a este botón para finalizar el proceso.",
          },
        },
      ],
    });

    return tour;
  };

  return {
    dashboardTour,
    layoutTour,
    procesosTour,
    studentsTour,
    adminsTour,
    configTour,
  };
};
