import yfinance as yf

def fetch_stock_data(symbol, exchange, start_date, end_date):
    print(f"🔎 Fetching data for {symbol} on {exchange} from {start_date} to {end_date}")

    try:
        # Handle NSE/NASDAQ ticker format
        if exchange == "NSE":
            ticker = symbol  # Symbol from autocomplete or manual input with .NS
        elif exchange == "NASDAQ":
            ticker = symbol
        else:
            print(f"❌ Invalid exchange: {exchange}")
            return None

        print(f"✅ Using ticker: {ticker}")

        stock = yf.Ticker(ticker)
        df = stock.history(
            start=start_date,
            end=end_date,
            interval="1d",
            auto_adjust=True
        )

        if df.empty:
            print("⚠️ No data returned from yfinance")
            return None

        # Convert DataFrame to records with date handling
        df.reset_index(inplace=True)
        data = df.to_dict(orient="records")
        
        # Format dates for JSON
        for record in data:
            record['Date'] = record['Date'].isoformat()

        print(f"✅ Successfully fetched {len(data)} records")
        return data

    except Exception as e:
        print(f"❌ Error in fetch_stock_data: {str(e)}")
        return None
