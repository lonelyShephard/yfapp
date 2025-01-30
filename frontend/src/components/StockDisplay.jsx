import React from "react";

const StockDisplay = ({ stockData }) => {
  return (
    <div>
      <h2>Stock Data</h2>
      {stockData.length > 0 ? (
        <table>
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
            {stockData.map((row, index) => (
              <tr key={index}>
                <td>{row.Date}</td>
                <td>{row.Open}</td>
                <td>{row.High}</td>
                <td>{row.Low}</td>
                <td>{row.Close}</td>
                <td>{row.Volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default StockDisplay;
