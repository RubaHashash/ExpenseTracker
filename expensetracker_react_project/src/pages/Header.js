import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Expenses from './Expenses';
import Home from './Expenses';

class Header extends Component{
    render(){
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{marginBottom: "50px"}}>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/expense">All Expenses</Link>
                            </li>

                            </ul>
                        </div>
                    </nav>


                    <Route exact path="/expense" component={Expenses}></Route>
                </div>
            </Router>

        )
    }

}

export default Header
