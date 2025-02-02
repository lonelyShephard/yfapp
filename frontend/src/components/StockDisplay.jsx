import React from 'react';

const StockDisplay = ({ data }) => {
    return (
        <div>
            <h2>Stock Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default StockDisplay;