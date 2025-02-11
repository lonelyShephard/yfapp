import sys
import os
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.stock_data import fetch_stock_data

# ✅ Fix UnicodeEncodeError in Windows
sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app)  # ✅ Allows all origins (for now)

@app.route('/fetch_stock_data', methods=['GET'])
def fetch_stock_data_endpoint():
    try:
        symbol = request.args.get('symbol')
        exchange = request.args.get('exchange', 'NSE')  # Default: NSE
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        if not symbol or not start_date or not end_date:
            return jsonify({"error": "Missing parameters"}), 400

        print(f"📊 Fetching data for {symbol} from {start_date} to {end_date} on {exchange}")

        # ✅ Make sure fetch_stock_data() expects 4 parameters
        data = fetch_stock_data(symbol, exchange, start_date, end_date)

        if data is None:
            return jsonify({"error": "No data found"}), 404

        return jsonify(data)

    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"❌ Error fetching stock data:\n{error_trace}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == '__main__':
    debug_mode = os.getenv("FLASK_DEBUG", "True") == "True"
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)  # ✅ Configurable for deployment
