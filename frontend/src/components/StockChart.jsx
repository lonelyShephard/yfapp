import React from "react";
import { Line } from "react-chartjs-2";

const StockChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: "Stock Price",
                data: data.map(d => d.price),
                borderColor: "blue",
                fill: false,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default StockChart;
