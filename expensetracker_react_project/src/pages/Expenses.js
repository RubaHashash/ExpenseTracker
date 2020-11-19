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
        let id = localStorage.getItem('id');
        axios.get('/api/expense/'+id)
        .then(response=>{
            this.setState({expenses_list:response.data});
        });
    }

    onDelete=(event)=>{
        let index = event.target.getAttribute('data-key');
        console.log(index);
        axios.delete('/api/expense/delete/'+index)
        .then(response=>{

            var expenses = this.state.expenses_list;

            for(var i = 0; i < expenses.length; i++)
            {
                if(expenses[i].id == index)
                {
                    expenses.splice(i,1);
                    this.setState({expenses_list:expenses});
                }
            }
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
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.expenses_list.map(exp=>{
                           return(
                            <tr key={exp.id}>
                                <th scope="row"></th>
                                    <td>{exp.category_name}</td>
                                    <td>{exp.amount}</td>
                                    <td>{exp.date}</td>
                                    <td>
                                        <Link to={`/EditExpense/${exp.id}`}>Edit</Link> | 
                                        <a href="#" data-key={exp.id} onClick={this.onDelete}> Delete</a>
                                    </td>
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