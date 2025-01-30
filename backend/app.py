from flask import Flask, request, jsonify
from flask_cors import CORS
from services.stock_data import get_stock_data  # Ensure correct import

app = Flask(__name__)

# Allow multiple frontend origins (localhost:3000 - localhost:3005)
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
]

CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

@app.route('/api/stock', methods=['GET'])
def get_stock():
    ticker = request.args.get("ticker")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    if not ticker or not start_date or not end_date:
        return jsonify({"error": "Missing required parameters"}), 400

    data = get_stock_data(ticker, start_date, end_date)
    return jsonify({"data": data})

if __name__ == "__main__":
    app.run(debug=True)
