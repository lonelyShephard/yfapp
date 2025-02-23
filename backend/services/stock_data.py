import time
import requests
import yfinance as yf
import random

# Create a persistent session
session = requests.Session()

# Set custom headers to avoid bot detection
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
}

session.headers.update(HEADERS)

def fetch_stock_data(symbol, exchange, start_date, end_date, max_retries=5):
    print(f"🔎 Fetching data for {symbol} on {exchange} from {start_date} to {end_date}")

    retry_delay = 5  # Initial delay in seconds

    for attempt in range(max_retries):
        try:
            # Handle NSE/NASDAQ ticker format
            if exchange in ["NSE", "NASDAQ"]:
                ticker = symbol
            else:
                print(f"❌ Invalid exchange: {exchange}")
                return {"error": f"Invalid exchange: {exchange}"}

            print(f"✅ Using ticker: {ticker}")

            # Introduce a random delay (1-3 seconds) before the request to mimic human behavior
            time.sleep(random.uniform(1, 3))

            stock = yf.Ticker(ticker, session=session)

            # Debugging: Print ticker info
            ticker_info = stock.info
            if not ticker_info or ticker_info == {}:
                print(f"⚠️ No valid info found for {symbol}. It may be delisted or incorrect.")
                return {"error": f"No valid info found for {symbol}"}
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
                return {"error": f"No data available for {symbol}"}

            # Convert DataFrame to records with date handling
            df.reset_index(inplace=True)
            data = df.to_dict(orient="records")

            # Format dates for JSON output
            for record in data:
                record['Date'] = record['Date'].isoformat()

            print(f"✅ Successfully fetched {len(data)} records")
            return data

        except requests.exceptions.RequestException as err:
            if "429" in str(err):  # Rate limit error
                print(f"⚠️ Rate limited. Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
            else:
                print(f"❌ Network error: {err}")
                return {"error": f"Network error: {err}"}

    print("❌ Too many requests. Try again later.")
    return {"error": "Too many requests. Try again later."}
