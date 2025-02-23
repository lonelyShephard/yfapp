import os
import traceback
from flask import Flask, request, jsonify
import sys
from flask_cors import CORS
from services.stock_data import fetch_stock_data

# ✅ Fix UnicodeEncodeError in Windows
sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app, origins=["https://yfapp.netlify.app"])  # Allow only Netlify frontend

@app.route('/', methods=['GET'])
def health_check():
    """Health check route."""
    try:
        return jsonify({
            "status": "healthy",
            "port": "10000",
            "service": "yfapp-backend",
            "message": "YF App Backend is running"
        }), 200
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/fetch_stock_data', methods=['GET'])
def fetch_stock_data_endpoint():
    """API endpoint to fetch stock data."""
    print(f"📝 Received request at: {request.path}")
    try:
        symbol = request.args.get('symbol')
        exchange = request.args.get('exchange', 'NSE')  # Default to NSE
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        if not symbol or not start_date or not end_date:
            return jsonify({"error": "Missing parameters"}), 400

        print(f"📊 Fetching data for {symbol} from {start_date} to {end_date} on {exchange}")

        # ✅ Fetch data from stock_data service
        data = fetch_stock_data(symbol, exchange, start_date, end_date)

        if data is None:
            return jsonify({"error": "No data found"}), 404

        return jsonify(data), 200

    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"❌ Error fetching stock data:\n{error_trace}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    try:
        print(f"🚀 Starting server on http://localhost:{PORT}")
        app.run(
            host='0.0.0.0',  # Allow all connections
            port=PORT, 
            debug=True,
            use_reloader=False,
            threaded=True  # Enable threading for better performance
        )
    except Exception as e:
        print(f"❌ Error starting server: {str(e)}")
        print(f"Stack trace:\n{traceback.format_exc()}")


