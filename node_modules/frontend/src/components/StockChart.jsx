import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StockChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const chartData = {
        labels: data.map(d => new Date(d.Date).toLocaleDateString()),
        datasets: [
            {
                label: "Close Price",
                data: data.map(d => d.Close),
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Stock Price History'
            },
        },
        scales: {
            y: {
                beginAtZero: false
            }
        }
    };

    return <Line data={chartData} options={options} />;
};

export default StockChart;
