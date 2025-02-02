import React, { useState } from 'react';

const StockInput = ({ onFetchData }) => {
    const [symbol, setSymbol] = useState('');
    const [exchange, setExchange] = useState('NSE');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onFetchData) {
            onFetchData(symbol, exchange, startDate, endDate);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter stock symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
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