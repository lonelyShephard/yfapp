import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000/api";

export const fetchStockData = async (ticker, startDate, endDate) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stock`, {
            params: { ticker, start_date: startDate, end_date: endDate },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};
