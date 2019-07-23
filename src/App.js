import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


import Navbar from "./components/navbar.component"
import TransactionsList from "./components/transactions-list.component"
import EditTransaction from "./components/edit-transaction-list.component"
import CreateTransaction from "./components/create-transaction.component"
import CreateCategory from "./components/create-category.component"

function App() {
 
  return (
    <Router>
      <Navbar />
      <br/> 
      <Route path="/" exact component={TransactionsList} />
      <Route path="/edit/:id" component={EditTransaction} />
      <Route path="/create" component={CreateTransaction} />
      <Route path="/user" component={CreateCategory} />

    </Router>
    
    );
  
} 

export default App;
