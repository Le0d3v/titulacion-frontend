import { Doughnut } from "react-chartjs-2"; // Cambiar a Doughnut
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ pendientes, completados }) {
  const data = {
    labels: ["Completados", "Pendientes"],

    datasets: [
      {
        label: "Procesos",
        data: [completados, pendientes],
        backgroundColor: ["rgba(27, 224, 215, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderColor: ["rgba(27, 224, 215, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  // Opciones de la gráfica
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 1)",
        },
        position: "top",
        color: "rgba(255, 255, 255, 1)",
      },
      title: {
        display: true,
        text: "Gráfica de Procesos en TSU",
        color: "rgba(255, 255, 255, 1)",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
