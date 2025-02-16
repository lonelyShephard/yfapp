import React, { useState } from 'react';
import { fetchStockData } from '../services/api';

const StockDashboard = () => {
  const [symbol, setSymbol] = useState('');
  const [exchange, setExchange] = useState('NSE');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null); // Clear previous data

    try {
      const response = await fetchStockData(symbol, exchange, startDate, endDate);
      setData(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Stock Analysis</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
        </label>
        <label>
          Exchange:
          <select value={exchange} onChange={(e) => setExchange(e.target.value)}>
            <option value="NSE">NSE</option>
            <option value="NASDAQ">NASDAQ</option>
          </select>
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Submit' : 'Loading...'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>

      {loading && <p>Loading data...</p>}

      {data && (
        <div>
          <h2>Stock Data</h2>
          {/* Display data in a table, chart, or other format */}
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Temporary display */}
        </div>
      )}
    </div>
  );
};

export default StockDashboard;