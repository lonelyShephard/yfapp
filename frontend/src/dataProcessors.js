// Function to format data for a table
export const formatDataForTable = (data) => {
  if (!data) return [];
  return data.map(item => ({
    date: item.Date,
    open: item.Open,
    high: item.High,
    low: item.Low,
    close: item.Close,
    volume: item.Volume,
  }));
};

// Function to prepare data for a chart (example using closing prices)
export const prepareDataForChart = (data) => {
  if (!data) return null;
  const labels = data.map(item => item.Date);
  const prices = data.map(item => item.Close);
  return {
    labels: labels,
    datasets: [{
      label: 'Stock Price',
      data: prices,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
};

// Add more data processing functions as needed