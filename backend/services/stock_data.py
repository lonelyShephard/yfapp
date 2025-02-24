import requests
import yfinance as yf
import random
import time

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
            if exchange in ["NSE", "NASDAQ"]:
                ticker = symbol
            else:
                print(f"❌ Invalid exchange: {exchange}")
                return {"error": f"Invalid exchange: {exchange}"}

            print(f"✅ Using ticker: {ticker}")

            time.sleep(random.uniform(1, 3))

            stock = yf.Ticker(ticker, session=session)
            ticker_info = stock.info
            if not ticker_info:
                print(f"⚠️ No valid info found for {symbol}.")
                return {"error": f"No valid info found for {symbol}"}
            
            df = stock.history(start=start_date, end=end_date, interval="1d", auto_adjust=True)
            if df.empty:
                print(f"⚠️ No data available for {symbol}.")
                return {"error": f"No data available for {symbol}"}

            df.reset_index(inplace=True)
            data = df.to_dict(orient="records")

            for record in data:
                record['Date'] = record['Date'].isoformat()

            print(f"✅ Successfully fetched {len(data)} records")
            return data

        except requests.exceptions.RequestException as err:
            if "429" in str(err):
                print(f"⚠️ Rate limited. Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
                retry_delay *= 2
            else:
                print(f"❌ Network error: {err}")
                return {"error": f"Network error: {err}"}

    return {"error": "Too many requests. Try again later."}
