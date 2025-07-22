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

const MuestrasHechas = ({tempData}) => {
    // Define tempData with example values or fetch them as needed
    /*const tempData = {
        ds18b20: 25,
        dht11_temp: 30,
        dht11_hum: 40,
    };*/

    const data = {
        //labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        labels:["DS18B20","DHT11 Temp","DHT11 Hum",],
        datasets: [
            {
                label: "Sensores",
                //data: [20, 49, 38, 37, 22, 27, 30], // máximo 50
                data: [tempData.ds18b20, tempData.dht11_temp, tempData.dht11_hum],
                borderColor: "rgb(235, 208, 54)",
                tension: 0.4, // curva suave
                pointRadius: 5,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        /*scales: {
            y: {
                min: 0,
                max: 50,
                ticks: {
                    stepSize: 10,
                },
            },
        },*/
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default MuestrasHechas;
