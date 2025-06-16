import React from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar los módulos necesarios para gráfica de línea
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const MuestrasHechas = () => {
    const data = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        datasets: [
            {
                label: "Análisis por día",
                data: [20, 49, 38, 37, 22, 27, 30], // máximo 50
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4, // curva suave
                pointRadius: 5,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 50,
                ticks: {
                    stepSize: 10,
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default MuestrasHechas;
