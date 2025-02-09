import React, { useState, useEffect } from 'react';

const StockInput = ({ onFetchData, stockList = [] }) => {
    const [symbol, setSymbol] = useState('');
    const [exchange, setExchange] = useState('NSE');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Handle symbol input change and generate suggestions
    useEffect(() => {
        if (symbol.length > 0 && stockList.length > 0) {
            const filteredStocks = stockList
                .filter(stock => 
                    stock.symbol.toLowerCase().includes(symbol.toLowerCase()) || 
                    stock.name.toLowerCase().includes(symbol.toLowerCase())
                )
                .slice(0, 5); // Get top 5 matches
            setSuggestions(filteredStocks);
        } else {
            setSuggestions([]);
        }
    }, [symbol, stockList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onFetchData) {
            onFetchData(symbol, exchange, startDate, endDate);
        }
    };

    const handleSuggestionClick = (selectedSymbol) => {
        setSymbol(selectedSymbol);
        setSuggestions([]); // Hide dropdown after selection
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative' }}>
                <input 
                    type="text" 
                    placeholder="Enter stock symbol or name" 
                    value={symbol} 
                    onChange={(e) => setSymbol(e.target.value)} 
                    required 
                />
                {/* Dropdown Suggestions */}
                {suggestions.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        background: 'white',
                        border: '1px solid #ccc',
                        listStyleType: 'none',
                        padding: '0',
                        margin: '0',
                        width: '100%',
                        zIndex: '1000',
                    }}>
                        {suggestions.map((stock) => (
                            <li 
                                key={stock.symbol} 
                                onClick={() => handleSuggestionClick(stock.symbol)}
                                style={{ padding: '5px', cursor: 'pointer' }}
                            >
                                {stock.symbol} - {stock.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <select value={exchange} onChange={(e) => setExchange(e.target.value)}>
                <option value="NSE">NSE</option>
                <option value="NASDAQ">NASDAQ</option>
            </select>

            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

            <button type="submit">Fetch Data</button>
        </form>
    );
};

export default StockInput;
