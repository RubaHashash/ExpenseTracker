import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class MyCategory extends Component {
    constructor(props){
        super(props)
        this.state={
            flag: false,
            category_list: [],
            category_name: '',
            open: false,
            setOpen: false,
        }
    }

    componentDidMount(){
        this.getCategories();
    }

    // get categories list for the logged in user
    getCategories = ()=>{
        let id = localStorage.getItem('id');
        axios.get('/api/categories/'+id)
        .then(response=>{
            this.setState({category_list:response.data});
        });
    }

    // onchange 
    onChangeCategoryName = (e) =>{
        this.setState({
            category_name: e.target.value
        });
    }

    // opens the dialog
    handleClickOpen = () => {
        this.setState({
            setOpen: true
        });
    };

    // closes the dialog
    handleClose = () => {
        this.setState({
            setOpen: false
        });
    };

    // adds a new category
    onSubmit = (e) =>{
        this.handleClose();
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

        this.getCategories();

    }

    deleteCategory = (event)=>{
        let index = event.target.getAttribute('data-key');
        axios.delete('/api/categories/delete/'+index)
        .then(response=>{

            var category = this.state.category_list;

            for(var i = 0; i < category.length; i++)
            {
                if(category[i].id == index)
                {
                    category.splice(i,1);
                    this.setState({category_list:category});
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
                <Header/>
                <h2 style={{ marginBottom: "50px" }}>My Categories</h2>

                <div style={{ marginLeft: "135px" }}>
                
                {
                    this.state.category_list.map(cat=>{
                        return(
                            <div className="card bg-light mb-3" 
                                style={{ width: "280px", height: "180px", float: "left", overflow: "hidden", marginLeft: "25px", marginBottom: "30px" }}>
                                <div className="card-header">Category
                                <button style={{ float: "right" }} data-key={cat.id} onClick={this.deleteCategory}>x</button>
                                </div>
                                <div className="card-body" style={{ marginTop: "20px"}}>
                                    <h2 className="card-title" style={{ textAlign: "center" }}>{cat.category_name}</h2>
                                </div>
                            </div>
                        )
                    })
                }

                </div>



                <Dialog open={this.state.setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                        <DialogContent>

                        <div>

                            <form onSubmit={this.onSubmit} id="addCatForm">
                                <div className="form-group">
                                    <input type="text" id= "category_name" name="category_name" className="form-control" placeholder= 'Category Name' 
                                        value={this.state.category_name} onChange={this.onChangeCategoryName} required/>
                                </div>

                                <div className="form-group" style={{ float: "right", marginTop: "30px" }}>
                                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                                    <Button type="submit">Add Category</Button>                                
                                </div>
                            </form>

                        </div>
                        </DialogContent>
                    </Dialog>


            </div>
        )
    }
}

export default MyCategory;