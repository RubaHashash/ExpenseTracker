import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import PieChart from './PieChart';
import {Redirect} from 'react-router-dom';
import Pagination from 'react-paginate';


class Expenses extends Component{
    constructor(props){
        super(props)
        this.state={
            expenses_list: [],
            flag: false,
            sort: (a, b) => a.id < b.id ? 1 : -1,
            chartData: []
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 1,
            // pageRangeDisplayed: 1
        }
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        let id = localStorage.getItem('id');
        axios.get('/api/expense/'+id)
        .then(response=>{
            this.setState({
                expenses_list:response.data,
                // itemsCountPerPage: response.data.per_page,
                // totalItemsCount: response.data.total,
                // activePage: response.data.current_page
            });
        });

        this.getChart();
    }

    handleAmountSort = () => {
        
        if (this.state.sort== "(a, b) => a.amount > b.amount ? 1 : -1")
        {
            this.setState({ sort: (a, b) => a.amount < b.amount ? 1 : -1 });
        }
        else {
            this.setState({ sort: (a, b) => a.amount > b.amount ? 1 : -1 });
        }
       
    }
    handleDateSort = () => {
       if (this.state.sort== "(a, b) => a.date > b.date ? 1 : -1")
        {
            this.setState({ sort: (a, b) => a.date < b.date ? 1 : -1 });
        }
        else {
            this.setState({ sort: (a, b) => a.date > b.date ? 1 : -1 });
        }
      
  }


    // handlePageChange(pageNumber = 1){
    //     let id = localStorage.getItem('id');
    //     axios.get('/api/expense/'+id+'?page='+pageNumber)
    //     .then(response=>{
    //         this.setState({
    //             expenses_list:response.data.data,
    //             itemsCountPerPage: response.data.per_page,
    //             totalItemsCount: response.data.total,
    //             activePage: response.data.current_page
    //         });
    //     });
    // }

    clickFunction = ()=>{
        this.setState({
            flag: true
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

        this.getChart();
    }

    getChart = () =>{
        var id = localStorage.getItem('id');
        axios.get('/api/pieChart/'+id)
        .then(response=>{
          console.log(response.data);
            this.setState({chartData:response.data});
        });
    }

    render(){
        if(localStorage.getItem('email') == null){
            return( <Redirect to={'/Login'} /> )
        }

        if(this.state.flag == true){
            return( <Redirect to={'/AddExpense'} /> )

        }
        return(
            <div>
                <Header />
                
                <div style={{ float: "left", overflow: "hidden", marginLeft: "70px", marginTop: "50px", width: "45%"}}>

                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Category</th>
                            <th scope="col" onClick={this.handleAmountSort}>Amount</th>
                            <th scope="col" onClick={this.handleDateSort}>Date</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.expenses_list.sort(this.state.sort).map(exp=>{
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
                    <button type="button" class="btn btn-secondary btn-circle btn-l" 
                        style={{ float: "right", fontSize: "20px", borderRadius: "50%", width: "45px" }} onClick={this.clickFunction}>+</button> 

                    <div>
                        {/* <Pagination
                            activePage = {this.state.activePage}
                            itemsCountPerPage = {this.state.itemsCountPerPage}
                            totalItemsCount = {this.state.totalItemsCount}
                            pageRangeDisplayed = {this.state.pageRangeDisplayed}
                            onChange = {this.handlePageChange}
                            itemClass='page-item'
                            linkClass = 'page-link'
                            firstPageText = 'First'
                            lastPageText = 'last'
                        /> */}
                    </div>
                    
                </div>
                <div style={{ float: "left", overflow: "hidden", marginTop: "50px", marginLeft: "20px", width: "45%" }}>
                    <PieChart dataParentToChild = {this.state.chartData}/>
                </div>
            </div>
        )
    }
}

export default Expenses;