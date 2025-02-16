import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

export const fetchStockData = async (symbol, exchange, startDate, endDate) => {
    const url = `${BASE_URL}/fetch_stock_data?symbol=${symbol}&exchange=${exchange}&start_date=${startDate}&end_date=${endDate}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};
