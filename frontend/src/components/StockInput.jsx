import React, { useState } from "react";

const StockInput = ({ onFetchStockData }) => {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fix: Ensure function exists before calling
    if (onFetchStockData) {
      onFetchStockData({ ticker, startDate, endDate });
    } else {
      console.error("Error: onFetchStockData function is not provided!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ticker:</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default StockInput;
