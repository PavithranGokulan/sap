from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/categorize', methods=['POST'])
def categorize_expenses():
    data = request.json
    expenses = data.get('expenses', [])
    print("Received expenses:", expenses)
    return jsonify({"message": "Expenses received", "received_expenses": expenses})

if __name__ == '__main__':
    app.run(debug=True)
