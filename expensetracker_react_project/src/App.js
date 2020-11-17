import React, {useEffect,useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';



import Login from './pages/Login';
import Register from './pages/Register';
import Expenses from './pages/Expenses';
import AddCategory from './pages/AddCategory';
import Logout from './pages/Logout';


function App() {

  return (
    <div className="App">
      
      <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/Login" exact component={Login}/>
        <Route path="/Logout" exact component={Logout}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/Expenses" exact component = {Expenses}/>
        <Route path="/AddCategory" exact component = {AddCategory}/>

      </Router>

    </div>

  );
}


export default App;
