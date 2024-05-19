import React, { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

function App() {
  const [showCategorizedBox, setShowCategorizedBox] = useState(true);
  const [categorizedExpenses, setCategorizedExpenses] = useState([]);

  const [allexpense, setexpense] = useState([]);
  const [newdesc, setnewdesc] = useState("");
  const [newprice, setnewprice] = useState("");

  const handleexpense = () => {
    let newexpense = {
      description: newdesc,
      price: newprice
    };

    let updatednewexpense = [...allexpense]; 
    updatednewexpense.push(newexpense);
    setexpense(updatednewexpense);
    localStorage.setItem('expenses', JSON.stringify(updatednewexpense));
    
    setnewdesc("");
    setnewprice("");
  };

  useEffect(()=>{
    let savedexpense = JSON.parse(localStorage.getItem('expenses'));
    if(savedexpense){
      setexpense(savedexpense);
    }
  },[])

  const handledeleteexpense = (index)=>{
    let reducedexpense = [...allexpense];
    reducedexpense.splice(index,1);

    localStorage.setItem('expenses',JSON.stringify(reducedexpense));
    setexpense(reducedexpense);
  };

  const handleCategorizeClick = () => {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    axios.post('http://localhost:5000/categorize', { expenses })
      .then(response => {
        console.log(response.data);
        const staticLabels = ['Category 1', 'Category 2', 'Category 3'];
        setCategorizedExpenses(staticLabels);
        setShowCategorizedBox(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }; 

  useEffect(() => {
    document.title = "Expense Categorization Bot";

    // Load initial state from localStorage
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setexpense(JSON.parse(storedExpenses));
    }
  }, []);

  return (
    <div className='App'>
      <h1>Expense Categorize Bot</h1>

      <div className='container'>
        <div className='Box-1'>
          <div className='expense-input'>
            <div className='expense-input-item'>
              <label>Expense Description</label>
              <input type='text' value={newdesc} onChange={(e) => setnewdesc(e.target.value)} placeholder='Enter Expense Description' />
            </div>
            <div className='expense-input-item'>
              <label>Price</label>
              <input type='text' value={newprice} onChange={(e) => setnewprice(e.target.value)} placeholder='Enter the price' />
            </div>
            <div className='expense-input-button'>
              <button type='button' onClick={handleexpense} className='primarybtn'>
                Add
              </button>
            </div>
          </div>

          <div className='categorize-btn'>
            <button className='secondary-btn' onClick={handleCategorizeClick}>Categorize</button>
          </div>

          <div className='expense-list'>
            {allexpense.map((item, index) => (
              <div className='expense-list-item' key={index}>
                <div>
                  <h3>{item.description}</h3>
                  <p>Rs.{item.price}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handledeleteexpense(index)} title="Delete?" />
                </div>
              </div>
            ))}
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
