import React from "react";

const StockTable = ({ data }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.date}</td>
                        <td>{row.open}</td>
                        <td>{row.high}</td>
                        <td>{row.low}</td>
                        <td>{row.close}</td>
                        <td>{row.volume}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StockTable;
