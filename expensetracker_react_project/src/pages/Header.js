import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Expenses from './Expenses';
import Home from './Expenses';

class Header extends Component{
    render(){
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{marginBottom: "25px"}}>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/"></a>
                            </li>
                            <li className="nav-item" style={{ marginLeft: "30px", marginRight: "8px" }}>
                                <a className="nav-link" href="/Expenses">Expenses</a>
                            </li>

                            <li className="nav-item" style={{ marginRight: "8px" }}>
                                <a className="nav-link" href="/MyCategory">My Categories</a>
                            </li>

                            <li className="nav-item" style={{ marginRight: "8px" }}>
                                <a className="nav-link" href="/ViewCategory">All Categories</a>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "760px" }}>
                                <a className="nav-link" href="/Logout">Logout</a>
                            </li>

                            </ul>
                        </div>
                    </nav>

                </div>
            </Router>

        )
    }

}

export default Header
