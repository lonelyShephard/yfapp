import React from "react";
import StockChart from "./StockChart";
import StockTable from "./StockTable";
import StockLogicProcessor from "./StockLogicProcessor";

const DataDisplay = ({ data, displayType }) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    switch (displayType) {
        case "chart":
            return <StockChart data={data} />;
        case "table":
            return <StockTable data={data} />;
        case "logic":
            return <StockLogicProcessor data={data} />;
        default:
            return <p>Invalid display type</p>;
    }
};

export default DataDisplay;
