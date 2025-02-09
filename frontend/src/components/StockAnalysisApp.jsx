import React, { useState, useEffect } from 'react';
import StockInput from './StockInput';
import StockDisplay from './StockDisplay';
import { fetchStockData } from '../services/api';
import stockListData from '../data/stocks.json'; // ✅ Import JSON directly

const StockAnalysisApp = () => {
    const [stockData, setStockData] = useState(null);
    const [stockList, setStockList] = useState([]);

    useEffect(() => {
        setStockList(stockListData); // ✅ Set stock list from imported JSON
        console.log("Stock List Loaded:", stockListData);
    }, []);

    const handleFetchData = async (symbol, exchange, startDate, endDate) => {
        try {
            const data = await fetchStockData(symbol, exchange, startDate, endDate);
            setStockData(data);
        } catch (error) {
            console.error("Failed to fetch stock data", error);
        }
    };

    return (
        <div>
            <h1>Stock Analysis</h1>
            <StockInput onFetchData={handleFetchData} stockList={stockList} />
            {stockData && <StockDisplay data={stockData} />}
        </div>
    );
};

export default StockAnalysisApp;
