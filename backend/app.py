import os
import traceback
import sys
import time
import functools
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.stock_data import fetch_stock_data

sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app, origins=["https://yfapp.netlify.app"])

CACHE_SIZE = 100

@functools.lru_cache(maxsize=CACHE_SIZE)
def get_cached_stock_data(symbol, exchange, start_date, end_date):
    print(f"⚡ Checking cache for {symbol} ({exchange}) from {start_date} to {end_date}")
    return fetch_stock_data(symbol, exchange, start_date, end_date)

@app.route('/', methods=['GET'])
def health_check():
    try:
        return jsonify({
            "status": "healthy",
            "port": os.environ.get("PORT", "10000"),
            "service": "yfapp-backend",
            "message": "YF App Backend is running"
        }), 200
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/fetch_stock_data', methods=['GET'])
def fetch_stock_data_endpoint():
    print(f"📝 Received request at: {request.path}")

    symbol = request.args.get('symbol')
    exchange = request.args.get('exchange', 'NSE')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    if not symbol or not start_date or not end_date:
        return jsonify({"error": "Missing parameters"}), 400

    print(f"📊 Fetching data for {symbol} from {start_date} to {end_date} on {exchange}")

    try:
        data = get_cached_stock_data(symbol, exchange, start_date, end_date)
        if data is None:
            return jsonify({"error": "No data found"}), 404
        return jsonify(data), 200
    except Exception as e:
        print(f"❌ Error fetching stock data: {traceback.format_exc()}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    try:
        print(f"🚀 Starting server on http://localhost:{PORT}")
        app.run(host='0.0.0.0', port=PORT, debug=True, use_reloader=False, threaded=True)
    except Exception as e:
        print(f"❌ Error starting server: {str(e)}")
        print(f"Stack trace:\n{traceback.format_exc()}")
