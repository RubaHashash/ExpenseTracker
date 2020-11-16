import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import ViewExpenses from './ViewExpenses'

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            expenses_list: [],
        }
    }

    componentDidMount = () =>{
        fetch('/expense')
        .then(response => response.json())
        .then(data => this.setState({expenses_list:data}));

    }

    render(){
        return <ViewExpenses data={this.state} />
    }
}

export default Home;