import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './Header';
import {Redirect} from 'react-router-dom';

class ViewCategory extends Component {
    constructor(props){
        super(props)
        this.state={
            category_list: [],
        }
    }

    componentDidMount(){
        axios.get('/api/categories/')
        .then(response=>{
            this.setState({category_list:response.data});
        });
    }

    render(){
        return(
            <div>
                <Header/>
                <h2 style={{ float: "left", marginLeft: "170px", marginBottom: "50px" }}>All Categories</h2>

                <div style={{ float: "left",marginLeft: "135px" }}>
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
            </div>
        )
    }
}

export default ViewCategory;