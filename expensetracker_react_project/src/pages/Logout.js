import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';


class Logout extends Component {

    constructor(){
        super();
        localStorage.removeItem('email');
    }
    render(){
        return( <Redirect to={'/Login'} /> )
    }
}

export default Logout;
