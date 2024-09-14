
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://mydb:Db123@cluster0.l1jmg.mongodb.net/python?retryWrites=true&w=majority&appName=Cluster0')
db = client['budget_tracker']

# Collections for income and expenses
income_collection = db['income']
expenses_collection = db['expenses']

@app.route('/')
def home():
    return "Welcome to the Budget Tracker App!"
#add income and expenses entries

@app.route('/income', methods=['POST'])
def add_income():
    data = request.json
    if 'amount' not in data or 'category' not in data or 'description' not in data:
        return jsonify({"error": "Required fields are missing"}), 400

    try:
        data['amount'] = float(data['amount'])
    except ValueError:
        return jsonify({"error": "Amount must be a number"}), 400

    new_income = {
        "amount": data['amount'],
        "category": data['category'],
        "description": data['description']
    }
    income_id = income_collection.insert_one(new_income).inserted_id
    return jsonify({"message": "Income added", "id": str(income_id)}), 201
#add expense
@app.route('/expense', methods=['POST'])
def add_expense():
    data = request.json
    if 'amount' not in data or 'description' not in data:
        return jsonify({"error": "Required fields are missing"}), 400

    try:
        data['amount'] = float(data['amount'])
    except ValueError:
        return jsonify({"error": "Amount must be a number"}), 400

    new_expense = {
        "amount": data['amount'],
        "description": data['description']
    }
    expense_id = expenses_collection.insert_one(new_expense).inserted_id
    return jsonify({"message": "Expense added", "id": str(expense_id)}), 201



@app.route('/income', methods=['GET'])
def get_all_income():
    incomes = list(income_collection.find())
    for income in incomes:
        income['_id'] = str(income['_id'])
    return jsonify(incomes), 200
#get all expenses


@app.route('/expense', methods=['GET'])
def get_all_expense():
    expenses = list(expenses_collection.find())
    for expense in expenses:
        expense['_id'] = str(expense['_id'])
    return jsonify(expenses), 200


@app.route('/totals', methods=['GET'])
def get_totals():
    total_income = sum([income['amount'] for income in income_collection.find()])
    total_expenses = sum([expense['amount'] for expense in expenses_collection.find()])
    remaining_budget = total_income - total_expenses
    
    return jsonify({
        "total_income": total_income,
        "total_expenses": total_expenses,
        "remaining_budget": remaining_budget
    }), 200




if __name__ == "__main__":
    app.run(debug=True)