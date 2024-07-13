import React, { useState } from 'react'
import ExpenseContext from './expenseContext'

const ExpenseState = (props) => {
    const [loading, setLoading] = useState(false);
    const host = "https://mern-api-backend-rho.vercel.app"
    // const host = "http://localhost:5000"
     
    const [expense, setExpense] = useState([])

    //Get all Expenses
  const getExpenses = async ()=>{
    //api call to get all expenses
    setLoading(true);
    const response = await fetch(`${host}/api/expenses/fetchallexpenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
  });
   const json = await response.json();
   setLoading(false);
   //console.log(json);
   setExpense(json);
  }


  //Add an expense
  const addExpense = async (desc, amount, date) =>{
    const response = await fetch(`${host}/api/expenses/addexpense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({desc, amount, date})
  });
    const json = await response.json();
    console.log(json)
    //logic to add an expense
    setExpense(expense.concat(json))
    }

  //Delete an expense
  const deleteExpense = async (id) =>{
    //delete api call
    const response = await fetch(`${host}/api/expenses/deleteexpense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    //logic for deleting an expense
    console.log("Deleting an expense with id : "+id)
    const newExpenses = expense.filter((exps)=>{return exps._id!==id})
    setExpense(newExpenses);
  }



  return (
    <ExpenseContext.Provider value={{expense,getExpenses, addExpense, deleteExpense, loading}}>
        {props.children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseState
