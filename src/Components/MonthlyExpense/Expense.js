import React, { useContext, useEffect, useState } from "react";
import expenseContext from "../../context/expenses/expenseContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import './Expense.css'

const Expense = (props) => {
  let navigate = useNavigate();
  // let currentDate = new Date().toISOString().split('T')[0];  //toISOString().slice(0, 10);
  
  let dt = new Date();
  dt.setHours(dt.getHours() + 5); //Adding 5 hours to time since toISOString give datetime 5-6 hours lesser time
  let currentDate = dt.toISOString().split('T')[0];;
  // still this date will be 30-40 min lesser than Indian time.(Date will change at night after +-12:30)
  // console.log(currentDate);

  const [total, setTotal] = useState(0);
  const [exps, setExps] = useState({desc: "",amount: "",date: currentDate });

  const context = useContext(expenseContext)
  const {expense,getExpenses, addExpense, deleteExpense, loading} = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (e) => {
    setExps({ ...exps, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addExpense(exps.desc, exps.amount, exps.date)
    setExps({ desc: "", amount: "", date: currentDate });
    props.showAlert("success","Expense is added successfully");
  };

  // --- Delete confirmation messagebox code starts -----------
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  // Function to handle delete button click
  const handleDeleteClick = (e, index) => {
    const buttonRect = e.target.getBoundingClientRect();
    const top = e.clientX - buttonRect.left; 
    const left = e.clientY - buttonRect.top;
    // requestAnimationFrame : helps ensure that the browser reflows and applies the styles before the transition starts.
    requestAnimationFrame(() => {
      // Show the message box and set position
      setShowMessageBox(!showMessageBox);
    });

    setButtonPosition({ top, left });
    // Set the row id that was clicked
    setClickedRowId(index);
    console.log(index);
  };

  // Function to handle confirming delete action
  const handleConfirmDelete = (e, id) => {
    e.preventDefault();
    //this calls api to delte an expense with passed id
    deleteExpense(id);
    //this deletes an expense with provided id in searched results
    setFilteredData(filteredData.filter((item) => item._id !== id));
    props.showAlert("success", "Expense is deleted successfully!");

    setShowMessageBox(!showMessageBox);
    setClickedRowId(null);
  };

  // Function to handle canceling delete action
  const handleCancelDelete = () => {
    // Reset state
    setShowMessageBox(!showMessageBox);
    setClickedRowId(null);
  };
  // --- Delete confirmation messagebox code : ENDS -----------

  // This code provides search functionality for all three fields
  // const handleSearch = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   setSearchTerm(value); // Update searchTerm state

  //   // Filter expense(data from api) based on any column containing search term
  //   if (value.trim() === "") {
  //     setFilteredData([]);
  //   } else {
  //     const filteredArray = expense.filter(
  //       (item) =>
  //         item.desc.toLowerCase().includes(value) ||
  //         item.amount.toString().includes(value) || // Convert amount to string for comparison
  //         item.date.slice(0, 10).includes(value) // slice(0,10) is used to remove time from date to exclude time from searching
  //     );
  //     setFilteredData(filteredArray); // Update filtered data state
  //   }
  // };

  // This code provides search functionality with date range for date, nrml search for other fields
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm); // Update searchTerm state

    let startDate = null;
    let endDate = null;

    // Splitting the search term into parts for different fields
    if (searchTerm.includes(":")) {
      const parts = searchTerm.split(":").map((part) => part.trim());

      // Extracting start and end dates if available
      if (parts.length === 2) {
        startDate = new Date(parts[0]);
        endDate = new Date(parts[1]);
        // Adjust endDate to include full day if searching for a single date
        endDate.setDate(endDate.getDate() + 1);
      }
      // else {
      //   // If only one part is provided, treat it as a single date
      //   startDate = new Date(parts[0]);
      //   endDate = new Date(parts[0]);
      //   // Adjust endDate to include full day if searching for a single date
      //   endDate.setDate(endDate.getDate() + 1);
      // }
    }
    // Filter expense (data from API) based on any column containing search term
    if (searchTerm.trim() === "") {
      setFilteredData([]);
    } else {
      const filteredArray = expense.filter((item) => {
        // Check if item matches search term in desc, amount, and date range
        const descMatches = item.desc.toLowerCase().includes(searchTerm);
        const amountMatches = item.amount.toString().includes(searchTerm);

        // Check if item matches date range if dates are provided
        let dateMatches = true;
        const itemDate = new Date(item.date);
        if (startDate && endDate) {
          dateMatches = itemDate >= startDate && itemDate < endDate;
        } else {
          dateMatches = item.date.slice(0, 10).includes(searchTerm);
        }

        return descMatches || amountMatches || dateMatches;
      });

      setFilteredData(filteredArray); // Update filtered data state
    }
  };

  /* Used two separate useEffects for 1)calling getExpenses(getting expenses from server) method and 2)Calculating total for original array and searched array. We are using them seperate because of loading spinner.
  For calculating total for both the arrays, we need to pass dependency arrays at last in useEffect. So,
  if we have getExpenses() method in the same useEffect, it will keep on calling getExpenses() method again and again and loading state will be keep on setting on true and false. It will lead to show loading spinner always and we will not be able to see data in table in front end.
  */

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getExpenses();
    } else {
      navigate("/Login");
    }
    // console.log('This is from useEffect:Main')
    // eslint-disable-next-line
  }, []);
      
  useEffect(() => {
      let sum = 0; // Calculate total based on filteredData if it's not empty, else use expense
      const arrayToCalculateTotal =
        filteredData.length > 0 ? filteredData : expense;

      for (let element of arrayToCalculateTotal) {
        sum += parseInt(element.amount);
      }
      setTotal(sum);
    // console.log('This is from useEffect:Total-calculation')
    // eslint-disable-next-line
  }, [expense, filteredData]);


  return (
    <div className="Expense-main bg-light">
      {/* ----input section---- */}
        <h2 style={{textAlign:'center', marginBottom:'10px'}}>Manage Expense</h2>
      
      <form className="Expense-inputs" onSubmit={handleAdd}>
        <input
          className='form-control'
          type="text"
          id="desc"
          name="desc"
          minLength={2}
          maxLength={20}
          placeholder="Description"
          value={exps.desc}
          onChange={handleChange}
        />
        <input
          className='form-control'
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          min="1" 
          step="any"
          max="1000000"
          value={exps.amount}
          onChange={handleChange}
        />
        <input style={{width:'100%'}}
          className='form-control'
          type="date"
          id="date"
          name="date"
          value={exps.date}
          onChange={handleChange}
          max={currentDate}
          required
        />
        <button
         type="submit"
          className="btn btn-dark"
          disabled={exps.desc.length === 0 || exps.amount.length === 0 || exps.date.length === 0 }
        >
          Add
        </button>
        </form>
      

      {/* --------------- Details section ----------------- */}
      {loading && <Spinner/>}
      {!loading && 
      <div className="Expense-details">
        <div className="Expense-details-total">
          <h5>Total : Rs. {total}</h5>
          <input
          className='form-control'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">Items</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col" >Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render based on filteredData if there's a search term, otherwise render all */}
            {searchTerm ? (
              filteredData.length > 0 ? (
                filteredData.map((row,index) => (
                  <tr key={index}>
                    <td>{row.desc}</td>
                    <td>{row.amount}</td>
                    <td>{row.date.slice(0, 10)}</td>
                    <td style={{ position: "relative" }}>
                        {/* <button onClick={() => removeItem(row._id)}>Remove</button> */}
                        <i
                          className="fa-solid fa-trash-can mx-2"
                          onClick={(e) => handleDeleteClick(e, index)}
                        ></i>
                        {clickedRowId === index && (
                          <div
                            className={`message-box ${showMessageBox ? "visible" : "hidden"}`}
                              style={{
                                top: buttonPosition.top,
                                left: buttonPosition.left,
                            }}
                          >
                            Delete?
                            <button onClick={(e) => handleConfirmDelete(e, row._id)}>
                               ✔
                            </button>
                            <button onClick={handleCancelDelete}>❌</button>
                          </div>
                        )}
                      </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No matching records found</td>
                </tr>
              )
            ) : (
              expense.slice().reverse().map((row,index) => (
                <tr key={index}>
                  <td>{row.desc}</td>
                  <td>{row.amount}</td>
                  <td>{row.date.slice(0, 10)}</td>
                  <td style={{ position: "relative" }}>
                      {/* <button onClick={() => removeItem(row._id)}>Remove</button> */}
                      <i
                        className="fa-solid fa-trash-can mx-2"
                        onClick={(e) => handleDeleteClick(e, index)}
                      ></i>
                      {clickedRowId === index && (
                        <div
                          className={`message-box ${showMessageBox ? "visible" : "hidden"}`}
                            style={{
                              top: buttonPosition.top,
                              left: buttonPosition.left,
                          }}
                        >
                          Delete?
                          <button onClick={(e) => handleConfirmDelete(e, row._id)}>
                            ✔
                          </button>
                          <button onClick={handleCancelDelete}>❌</button>
                        </div>
                      )}
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> 
      }
    </div> 
  );
};

export default Expense;
