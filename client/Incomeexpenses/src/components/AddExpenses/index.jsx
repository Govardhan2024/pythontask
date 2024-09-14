import  { useState } from 'react';
import axios from 'axios';
import './index.css'

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitOne = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/expense', { amount, category, description });
      setMessage(`Expense added: ${response.data.id}`);
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h1>Add Expense</h1>
      <div>
      <form onSubmit={handleSubmitOne}>
        <div>
          <label>Amount:</label>
          <input 
            type="text" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Category:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddExpense;
