import React, { useState } from 'react';

const StockInput = ({ onFetchStockData }) => {
    const [symbol, setSymbol] = useState('');
    const [exchange, setExchange] = useState('NSE');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const stockList = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "INFY.NS", "RELIANCE.NS"]; // Sample symbols

    const handleInputChange = (event) => {
        const input = event.target.value.toUpperCase();
        setSymbol(input);
        setSuggestions(stockList.filter(stock => stock.includes(input)).slice(0, 5));
    };

    const handleSelectSuggestion = (selectedSymbol) => {
        setSymbol(selectedSymbol);
        setSuggestions([]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (symbol && startDate && endDate) {
            onFetchStockData({ symbol, exchange, startDate, endDate });
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Stock Symbol:</label>
                <input type="text" value={symbol} onChange={handleInputChange} required />
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((s, index) => (
                            <li key={index} onClick={() => handleSelectSuggestion(s)}>
                                {s}
                            </li>
                        ))}
                    </ul>
                )}

                <label>Exchange:</label>
                <select value={exchange} onChange={(e) => setExchange(e.target.value)}>
                    <option value="NSE">NSE</option>
                    <option value="NASDAQ">NASDAQ</option>
                </select>

                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                <button type="submit">Fetch</button>
            </form>
        </div>
    );
};

export default StockInput;
