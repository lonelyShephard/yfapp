import React, { useState, useEffect } from 'react';
import StockInput from './StockInput';
import StockDisplay from './StockDisplay';
import { fetchStockData } from '../services/api';

const StockAnalysisApp = () => {
    const [stockData, setStockData] = useState(null);
    const [stockList, setStockList] = useState([]);

    useEffect(() => {
        import('../data/stocks.json')
            .then(data => setStockList(data.default))
            .catch(error => console.error("Error loading stock list:", error));
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
