import yfinance as yf

def fetch_stock_data(symbol, exchange, start_date, end_date):
    print(f"🔎 Fetching data for {symbol} on {exchange} from {start_date} to {end_date}")

    try:
        # Handle NSE/NASDAQ ticker format
        if exchange == "NSE":
            ticker = symbol  # Ensure symbol is correctly formatted
        elif exchange == "NASDAQ":
            ticker = symbol
        else:
            print(f"❌ Invalid exchange: {exchange}")
            return None

        print(f"✅ Using ticker: {ticker}")

        stock = yf.Ticker(ticker)

        # Debugging: Print ticker info
        ticker_info = stock.info
        if not ticker_info or ticker_info == {}:
            print(f"⚠️ No valid info found for {symbol}. It may be delisted or incorrect.")
            return None
        print(f"🧐 Ticker Info: {ticker_info}")

        # Fetch historical data
        df = stock.history(
            start=start_date,
            end=end_date,
            interval="1d",
            auto_adjust=True
        )

        # Debugging: Print raw data
        print(f"📜 Raw Data from yfinance:\n{df}")

        if df.empty:
            print(f"⚠️ No data returned for {symbol}. Possible reasons:")
            print("- The ticker symbol is incorrect")
            print("- The stock may be delisted or unavailable")
            print("- yfinance API might be down")
            return None

        # Convert DataFrame to records with date handling
        df.reset_index(inplace=True)
        data = df.to_dict(orient="records")

        # Format dates for JSON output
        for record in data:
            record['Date'] = record['Date'].isoformat()

        print(f"✅ Successfully fetched {len(data)} records")
        return data

    except Exception as e:
        print(f"❌ Error in fetch_stock_data: {str(e)}")
        return None
