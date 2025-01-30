import React, { useState } from "react";
import axios from "axios";
import StockInput from "./StockInput";
import StockDisplay from "./StockDisplay";

const StockAnalysisApp = () => {
  const [stockData, setStockData] = useState([]);

  const fetchStockData = async ({ ticker, startDate, endDate }) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/stock", {
        params: { ticker, start_date: startDate, end_date: endDate },
      });

      console.log("API Response Data:", response.data);

      // Extract stock data array from API response
      const stockArray = response.data.data || []; // Ensure it's an array

      setStockData(stockArray);
      console.log("Updated Stock Data State:", stockArray);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div>
      <h1>Stock Analysis</h1>
      {/* Fix: Ensure prop name matches */}
      <StockInput onFetchStockData={fetchStockData} />
      <StockDisplay stockData={stockData} />
    </div>
  );
};

export default StockAnalysisApp;
