import  { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

const TotalList = () => {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch income data
                const incomeResponse = await axios.get('http://127.0.0.1:5000/income');
                setIncome(incomeResponse.data);

                // Fetch expense data
                const expenseResponse = await axios.get('http://127.0.0.1:5000/expense');
                setExpenses(expenseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Total List</h1>
            <h2>Income</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {income.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>Rs {item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Expenses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td> Rs {item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalList;
