import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

export const fetchStockData = async (symbol, exchange, startDate, endDate) => {
    const url = `${BASE_URL}/fetch_stock_data?symbol=${symbol}&exchange=${exchange}&start_date=${startDate}&end_date=${endDate}`;
    console.log(`📡 Requesting: ${url}`); // Debugging

    try {
        const response = await axios.get(url);
        console.log("✅ Data received:", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching stock data:", error.response?.data || error.message);
        throw error;
    }
};
