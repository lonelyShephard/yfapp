import yfinance as yf

def fetch_stock_data(symbol, exchange, start_date, end_date):  
    print(f"🔎 Fetching data for {symbol} on {exchange} from {start_date} to {end_date}")

    try:
        # Handle NSE/NASDAQ ticker format
        if exchange == "NSE":
            ticker = f"{symbol}.NS"
        elif exchange == "NASDAQ":
            ticker = symbol  # No suffix needed
        else:
            return None  # Invalid exchange

        print(f"✅ Using ticker: {ticker}")

        stock = yf.Ticker(ticker)
        df = stock.history(start=start_date, end=end_date)

        if df.empty:
            print("⚠️ No data returned from yfinance")
            return None

        return df.to_dict(orient="records")

    except Exception as e:
        print(f"❌ Error in fetch_stock_data: {str(e)}")
        return None
