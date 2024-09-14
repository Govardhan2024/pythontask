
import { useState, useEffect } from 'react';
import axios from 'axios';

const Budgetsummery = () => {
  const [totals, setTotals] = useState({
    total_income: 0,
    total_expenses: 0,
    remaining_budget: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/totals');
        setTotals(response.data);
      } catch (error) {
        setError('Failed to fetch totals');
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Budget Summary</h1>
      <p>Total Income: Rs {totals.total_income.toFixed(2)}</p>
      <p>Total Expenses: Rs {totals.total_expenses.toFixed(2)}</p>
      <p>Remaining Budget: Rs {totals.remaining_budget.toFixed(2)}</p>
    </div>
  );
};

export default Budgetsummery;
