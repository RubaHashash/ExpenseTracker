import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './Header';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ViewCategory extends Component {
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

    getCategories = ()=>{
        axios.get('/api/categories/')
        .then(response=>{
            this.setState({category_list:response.data});
        });
    }

    onChangeCategoryName = (e) =>{
        this.setState({
            category_name: e.target.value
        });
    }

    handleClickOpen = () => {
        this.setState({
            setOpen: true
        });
    };

    handleClose = () => {
        this.setState({
            setOpen: false
        });
    };

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

    render(){
        if(localStorage.getItem('email') == null){
            return( <Redirect to={'/Login'} /> )
        }
        // if(this.state.flag == true){
        //     return( <Redirect to={'/AddCategory'} /> )

        // }

        return(
            <div>
                <Header/>
                <h2 style={{ float: "left", marginLeft: "170px", marginBottom: "50px" }}>All Categories</h2>

                <div style={{ float: "left",marginLeft: "135px" }}>
                    <div className="card bg-light mb-3" 
                                    style={{ width: "280px", height: "180px", float: "left", overflow: "hidden", marginLeft: "25px", marginBottom: "30px" }}>
                        <div className="card-header">Add Category</div>
                        <div className="card-body" style={{ marginTop: "6px"}}>
                            <h2 className="card-title" style={{ textAlign: "center" }}><button type="button" class="btn btn-secondary btn-circle btn-l" 
                            style={{ float: "center", fontSize: "40px", borderRadius: "50%", width: "80px", height: "80px" }} onClick={this.handleClickOpen}>+</button> </h2>
                        </div>
                    </div>
                
                {
                    this.state.category_list.map(cat=>{
                        return(
                            <div className="card bg-light mb-3" 
                                style={{ width: "280px", height: "180px", float: "left", overflow: "hidden", marginLeft: "25px", marginBottom: "30px" }}>
                                <div className="card-header">Category</div>
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

export default ViewCategory;