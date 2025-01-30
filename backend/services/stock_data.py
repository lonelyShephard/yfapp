import yfinance as yf

def get_stock_data(ticker, start_date, end_date):
    """
    Fetch historical stock data for a given ticker within a date range.

    Args:
        ticker (str): Stock ticker symbol (e.g., 'AAPL').
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.

    Returns:
        list: A list of dictionaries containing stock data (Date, Open, High, Low, Close, Volume).
    """
    try:
        # Fetch stock data using yfinance
        stock = yf.Ticker(ticker)
        hist = stock.history(start=start_date, end=end_date)

        # If no data is returned, return an empty list
        if hist.empty:
            return []

        # Convert the index to a column and format dates
        hist.reset_index(inplace=True)
        hist["Date"] = hist["Date"].dt.strftime('%Y-%m-%d')

        # Extract required columns
        return hist[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']].to_dict(orient='records')

    except Exception as e:
        return {"error": str(e)}
