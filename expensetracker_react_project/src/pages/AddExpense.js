import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class AddExpense extends Component{
    
    constructor(props){
        super(props)
        this.state={
            flag: false,
            categories_list: [],
        }
    }

    componentDidMount(){
        axios.get('/api/getCategory')
        .then(response=>{
            this.setState({categories_list:response.data});
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const user = localStorage.getItem('id');
        const form = document.getElementById("addExpForm");
        const formData = new FormData(form);
        formData.append('user',user);
        const headers = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'crossOrigin': true,
                'Access-Control-Allow-Origin' : '*'
                }
            }

        axios.post('/api/addExpense/add', formData, headers)
        .then(response => {
            this.setState({
                loader: '',
                status: response.data.message,
            });
            console.log(response.data);
            if(response.data.status === "Success"){
              this.setState({
                flag: true
              });
            }
        })
        .catch(error => {
            if (error.response) {
                this.setState({
                    loader: '',
                    status: '',
                });
                console.log(error.response);
              }
        });
    }

    onChangeExpense= (e)=>{
        this.setState({
            expense_list: e.target.value
        });
    }



    render(){
        if(localStorage.getItem('email') == null){
            return( <Redirect to={'/Login'} /> )
        }

        if(this.state.flag == true){
            return( <Redirect to={'/Expenses'} /> )
        }
        return(
            <div>
                <Header />
                 <h2 style={{ float: "left", marginLeft: "170px", marginBottom: "50px" }}>Add Expense</h2>

                <form onSubmit={this.onSubmit} onChange={this.onChangeExpense} 
                    style={{ width: "70%", marginLeft: "170px" }} id="addExpForm">
                    <div className="form-group">
                        <input type="Date" id= "exp_date" name="exp_date" className="form-control" placeholder= 'Date' required/>
                    </div>
                    <div className="form-group">
                        <input type="number" step="0.01" id= "exp_amount" name="exp_amount" className="form-control" placeholder= 'Amount $' required/>
                    </div>

                    <div className="input-group mb-3">
                    <select className="custom-select" id="inputGroupSelect02" name="exp_category">
                        <option defaultValue>Choose...</option>
                        {
                            this.state.categories_list.map(cat=>{
                            return(
                                <option key={cat.id}>{ cat.category_name }</option>
                            )
                            })
                        }
                    </select>

                    <div className="input-group-append">
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Category</label>
                    </div>
                    </div>

                    <div className="form-group" style={{ float: "right", marginTop: "30px" }}>
                        <button type="submit" className="btn btn-secondary">Add</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default AddExpense;

