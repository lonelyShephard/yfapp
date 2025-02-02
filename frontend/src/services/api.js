import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';  // Ensure this matches Flask server

export const fetchStockData = async (symbol, exchange = "NSE", startDate, endDate) => {
    try {
        const response = await axios.get(`${BASE_URL}/fetch_stock_data`, {
            params: { symbol, exchange, start_date: startDate, end_date: endDate }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return { error: error.message };
    }
};
