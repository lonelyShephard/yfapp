import React from "react";

const StockLogicProcessor = ({ data }) => {
    return (
        <div>
            <h3>Stock Trends</h3>
            <ul>
                {data.map((row, index) => (
                    <li key={index}>
                        {row.date}: {row.trend}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockLogicProcessor;
