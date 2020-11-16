import React, {useEffect,useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {Route, Router} from "react-router-dom";


import Header from './pages/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Expenses from './pages/Expenses';

function App() {

  return (
    <div className="App">
      <Header />
      <Register />
      
      <Router>
        <Route path="./pages/Expenses" exact component = {Expenses}/>
      </Router>

    </div>

  );
}


export default App;
