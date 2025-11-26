import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useStudentTour = () => {
  const homeTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por el Home",
            description:
              "Sigue estos pasos para conocer tu dashboard principal y sus componentes.",
          },
        },
        {
          element: "#home-header",
          popover: {
            title: "Header",
            description:
              "Utiliza el Header para corroborar que te encuentres en la sección correcta.",
          },
        },
        {
          element: "#home-tutorial",
          popover: {
            title: "Iniciar Tour",
            description:
              "Inicia este tour las veces que necesites utilziando este botón.",
          },
        },
        {
          element: "#home-main",
          popover: {
            title: "Información General",
            description:
              "Consulta en esta sección información general sobre tu identeidad universitaria y procceso de titulación.",
          },
        },
        {
          element: "#home-contenedor-1",
          popover: {
            title: "Datos Personales",
            description:
              "Visualiza tus datos personales más relevantes en el sistema.",
          },
        },
        {
          element: "#home-contenedor-2",
          popover: {
            title: "Tu Progreso",
            description:
              "Observa el estado actual de tu proceso y un resumen de tus actividades.",
          },
        },
        {
          element: "#home-contenedor-3",
          popover: {
            title: "Tus Actividades",
            description: "Accede a cada una de tus actividades y su estado",
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
      ],
    });

    return tour;
  };

  const filesTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por la sección de Tus Archivos",
            description:
              "A través de esta sección realizarás la gestión de tus archivos.",
          },
        },
        {
          element: "#files-header",
          popover: {
            title: "Header",
            description:
              "Utiliza el header para comprobar que te localices en la sección correcta.",
          },
        },
        {
          element: "#files-tutorial",
          popover: {
            title: "Iniciar Tour",
            description: "Vuelve a visualizar este tour accionando este botón.",
          },
        },
        {
          element: "#files-card",
          popover: {
            title: "Archivo",
            description:
              "Cada tarjeta contiene información importnante de uno de tus archivos.",
          },
        },
        {
          element: "#files-nombre",
          popover: {
            title: "Nombre del Archivo",
            description:
              "Localiza que archivo subiste a través de su nombre dentro de tu proceso.",
          },
        },
        {
          element: ".files-archivo",
          popover: {
            title: "Tu Archivo",
            description:
              "Si tienes un archivo adjuntado aparecerá en este espacio.",
          },
        },
        {
          element: "#files-alerta",
          popover: {
            title: "Mensaje",
            description:
              "Si no haz adjuntado ningun archivo verás un mensaje de error.",
          },
        },
        {
          element: "#files-acciones",
          popover: {
            title: "Acciones con tus archivos",
            description:
              "Interactua con tus archivos utilizando los botones de acción.",
          },
        },
        {
          element: "#files-eliminar",
          popover: {
            title: "Eliminar Archivo",
            description:
              "Elimina tu archivo con este botón. NOTA: El proceso es irreversible.",
          },
        },
        {
          element: "#files-nuevo",
          popover: {
            title: "Enviar otro Archivo",
            description:
              "O bien, remplazalo por otro utilizando este enlace. Te llevará a la sección de tu proceso.",
          },
        },
        {
          element: "#carta-excencion",
          popover: {
            title: "Carta de Excención de Titulación",
            description:
              "Cuando completes tu proceso de titulación al 100% vuelve a esta sección para decargar tu carta de excención.",
          },
        },
        {
          element: "#files-descargar",
          popover: {
            title: "Descargar el Archivo",
            description:
              "Descarga el archivo las veces que lo desees utilizando este botón.",
          },
        },
      ],
    });

    return tour;
  };

  const procesoTour = () => {
    const tour = driver({
      showProgress: true,
      steps: [
        {
          element: "#admin-outlet",
          popover: {
            title: "Bienvenido al Tour por la sección de Tu Proceso",
            description:
              "A través de esta sección realizarás las actividades que conforman tu proceso de titulación.",
          },
        },
        {
          element: "#my-proceso-header",
          popover: {
            title: "Header",
            description:
              "Utiliza el header para comprobar que te localices en la sección correcta.",
          },
        },
        {
          element: "#my-proceso-tutorial",
          popover: {
            title: "Iniciar Tour",
            description: "Vuelve a visualizar este tour accionando este botón.",
          },
        },
        {
          element: "#my-proceso-general",
          popover: {
            title: "Información General",
            description:
              "Visualiza el avance de tu proceso y un resumen de tus acrividades.",
          },
        },
        {
          element: "#my-proceso-barra",
          popover: {
            title: "Porcentaje de Avance",
            description:
              "Visualiza en tiempo real el porcentaje de avance en tu proceso. Conforme avance tu proceso la barra cambiará.",
          },
        },
        {
          element: "#my-proceso-pendientes",
          popover: {
            title: "Actividades Pendientes",
            description:
              "Visualiza en tiempo real el número exacto de tus actividades pendientes.",
          },
        },
        {
          element: "#my-proceso-completadas",
          popover: {
            title: "Actividades Completadas",
            description:
              "Visualiza en tiempo real el número exacto de tus actividades completadas.",
          },
        },
        {
          element: "#my-proceso-card",
          popover: {
            title: "Subproceso",
            description:
              "Cada tarjeta contiene información sobre una de tus actividades correspondientes.",
          },
        },
        {
          element: "#my-proceso-nombre",
          popover: {
            title: "Nombre del Proceso",
            description: "Identifica el proceso a través de su nombre.",
          },
        },
        {
          element: "#my-proceso-estado",
          popover: {
            title: "Estado del Proceso",
            description: "Monitoriea en tiempo real el estado de tu proceso.",
          },
        },
        {
          element: "#my-proceso-cargar",
          popover: {
            title: "Cargar Archivo",
            description:
              "Para los procesos que implican carga de archivos envíalos utilizando el formulario.",
          },
        },
        {
          element: "#my-proceso-input",
          popover: {
            title: "Seleccionar archivo",
            description: "Selecciona tu archivo con el botón.",
          },
        },
        {
          element: "#my-proceso-enviar",
          popover: {
            title: "Enviar Archivo",
            description: "Envialo a los administrativos usando el botón.",
          },
        },
        {
          element: "#my-proceso-comentarios",
          popover: {
            title: "Comentarios",
            description:
              "Si tienes comentarios acerca de este proceso aparecerán aquí.",
          },
        },
        {
          element: "#my-proceso-enlace",
          popover: {
            title: "Procesos sin carga de archivos",
            description:
              "Para los procesos que no implican carga de archivos acciona los enlaces para realizar las operaciones solicitadas.",
          },
        },
        {
          element: "#my-proceso-referencia",
          popover: {
            title: "Procesos con envio de texto",
            description:
              "Para los procesos que implican enviar información, coloca la información solicitada en este espacio.",
          },
        },
        {
          element: "#my-proceso-referencia-boton",
          popover: {
            title: "Envío de Datos",
            description: "Y envia los datos utilizando este botón.",
          },
        },
      ],
    });

    return tour;
  };

  return {
    homeTour,
    configTour,
    filesTour,
    procesoTour,
  };
};
