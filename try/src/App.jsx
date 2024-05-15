import React, { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';

function App() {
  const [showCategorizedBox, setShowCategorizedBox] = useState(true);
  const [categorizedExpenses, setCategorizedExpenses] = useState([]);

  const handleCategorizeClick = () => {
    const staticLabels = ['Category 1', 'Category 2', 'Category 3'];
    setCategorizedExpenses(staticLabels);
    setShowCategorizedBox(true);
  };
  
  useEffect(()=>{
    document.title = "Expense Categorization Bot"
  })

  return (
    <div className='App'>
      <h1>Expense Categorize Bot</h1>

      <div className='container'>
        <div className='Box-1'>
          <div className='expense-input'>
            <div className='expense-input-item'>
              <label>Expense Description</label>
              <input type='text' placeholder='Enter Expense Description' />
            </div>
            <div className='expense-input-item'>
              <label>Price</label>
              <input type='text' placeholder='Enter the price' />
            </div>
            <div className='expense-input-button'>
              <button type='button' className='primarybtn'>
                Add
              </button>
            </div>
          </div>

          <div className='categorize-btn'>
            <button className='secondary-btn' onClick={handleCategorizeClick}>Categorize</button>
          </div>

          <div className='expense-list'>
            <div className='expense-list-item'>
              <div>
                <h3>Expense-1</h3>
                <p>Price</p>
              </div>

              <div>
                <AiOutlineDelete className='icon' />
              </div>
            </div>
          </div>
        </div>

        {showCategorizedBox && (
          <div className='categorized-expenses-box'>
            <h2>Categorized Expenses</h2>
            <ul>
              {categorizedExpenses.map((expense, index) => (
                <li key={index}>{expense}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
