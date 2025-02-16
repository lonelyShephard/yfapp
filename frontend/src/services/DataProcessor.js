export const processStockData = (data, processingType) => {
    if (!Array.isArray(data) || data.length === 0) return []; // Ensure valid array

    switch (processingType) {
        case "chart":
            return data.map(entry => ({
                date: entry.date,
                price: entry.close || 0, // Default value if missing
            }));

        case "table":
            return data.map(entry => ({
                date: entry.date,
                open: entry.open || 0,
                high: entry.high || 0,
                low: entry.low || 0,
                close: entry.close || 0,
                volume: entry.volume || 0,
            }));

        case "logic":
            return data.map(entry => ({
                date: entry.date,
                trend: entry.close > entry.open ? "Up" : "Down",
            }));

        default:
            return data;
    }
};
