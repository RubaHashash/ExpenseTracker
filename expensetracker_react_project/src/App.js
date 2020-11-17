import React, {useEffect,useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';



import Login from './pages/Login';
import Register from './pages/Register';
import Expenses from './pages/Expenses';


function App() {

  return (
    <div className="App">
      
      <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/Expenses" exact component = {Expenses}/>
      </Router>

    </div>

  );
}


export default App;
