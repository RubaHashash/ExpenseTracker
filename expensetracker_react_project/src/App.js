import React, {useEffect,useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


import Login from './pages/Login';
import Register from './pages/Register';
import Expenses from './pages/Expenses';
import Logout from './pages/Logout';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import ViewCategory from './pages/ViewCategory';
import MyCategory from './pages/MyCategory';


function App() {

  return (
    <div className="App">
      
      <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/Login" exact component={Login}/>
        <Route path="/Logout" exact component={Logout}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/Expenses" exact component = {Expenses}/>
        <Route path="/ViewCategory" exact component = {ViewCategory}/>
        <Route path="/MyCategory" exact component = {MyCategory}/>
        <Route path="/AddExpense" exact component = {AddExpense}/>
        <Route path="/EditExpense/:id" exact component = {EditExpense}/>


      </Router>

    </div>

  );
}


export default App;
