// components/SampleChart.jsx
import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar los módulos
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SampleChart = ({tempData}) => {
    const data = {
        //labels: ["Enero", "Febrero", "Marzo", "Abril"],
        labels: ["Temperatura", "Humedad"],
        datasets: [
        {
            label: "Valores",
            data: [tempData.dht11_temp, tempData.dht11_hum],
            backgroundColor: "rgb(255, 193, 92)",
        },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SampleChart;
