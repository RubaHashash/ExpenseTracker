import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import {Redirect} from 'react-router-dom';



class Expenses extends Component{
    constructor(props){
        super(props)
        this.state={
            expenses_list: [],
        }
    }

    componentDidMount(){
        axios.get('/api/expense')
        .then(response=>{
            this.setState({expenses_list:response.data});
        });
    }

    render(){
        if(localStorage.getItem('email') == null){
            return( <Redirect to={'/Login'} /> )
        }
        return(
            <div>
                <Header />
                <br></br>
                <table className="table table-striped" style={{ width: "70%", marginLeft: "170px" }}>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.expenses_list.map(exp=>{
                           return(
                            <tr>
                                <th scope="row">1</th>
                                    <td>{exp.category_name}</td>
                                    <td>{exp.amount}</td>
                                    <td>{exp.date}</td>
                            </tr>
                           )

                        })

                    }

                </tbody>
                </table>

            </div>
        )
    }
}

export default Expenses;