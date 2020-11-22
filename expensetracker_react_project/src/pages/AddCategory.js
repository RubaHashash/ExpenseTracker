import Axios from 'axios';
import React, { Component } from 'react'
import Header from './Header';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class AddCategory extends Component {

    constructor(){
        super();
        this.state={
            flag: false,
            category_name: ''
        }
    }

    onChangeCategoryName = (e) =>{
        this.setState({
            category_name: e.target.value
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const form = document.getElementById("addCatForm");
        const formData = new FormData(form);
        const headers = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'crossOrigin': true,
                'Access-Control-Allow-Origin' : '*'
                }
            }

        axios.post('/api/category/add', formData, headers)
        .then(response => {
            this.setState({
                loader: '',
                status: response.data.message,
            });
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

    render(){
        if(localStorage.getItem('email') == null){
            return( <Redirect to={'/Login'} /> )
        }
        if(this.state.flag == true){
            return( <Redirect to={'/ViewCategory'} /> )

        }
        return(
            <div>
                <Header />
                 <h2 style={{ float: "left", marginLeft: "170px", marginBottom: "50px" }}>Add Category</h2>

                <form onSubmit={this.onSubmit} style={{ width: "70%", marginLeft: "170px" }} id="addCatForm">
                    <div className="form-group">
                        <input type="text" id= "category_name" name="category_name" className="form-control" placeholder= 'Category Name' 
                            value={this.state.category_name} onChange={this.onChangeCategoryName} required/>
                    </div>

                    <div className="form-group" style={{ float: "right", marginTop: "30px" }}>
                        <button type="submit" className="btn btn-secondary">Add</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default AddCategory;
