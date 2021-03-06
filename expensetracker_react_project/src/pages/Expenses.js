import axios from 'axios';
import React, { Component } from 'react';
import Header from './Header';
import PieChart from './PieChart';
import {Redirect} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class Expenses extends Component{
    constructor(props){
        super(props)
        this.state={
            expenses_list: [],
            categories_list: [],
            edit_expense_list: [],
            flag: false,
            sort: (a, b) => a.id < b.id ? 1 : -1,
            chartData: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            open: false,
            setOpen: false,
            setEditOpen: false,
            search: ''
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        // get categories for add category
        axios.get('/api/getCategory')
        .then(response=>{
            this.setState({categories_list:response.data});
        });
        
        //get expenses
        this.getExpensesFromDB();
        //get pie chart
        this.getChart();
    }

    // get expenses for table funtion
    getExpensesFromDB = ()=>{
        // get expenses
        let id = localStorage.getItem('id');
        axios.get('/api/expense/'+id)
        .then(response=>{
            this.setState({
                expenses_list:response.data.data,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page
            });
        });
    }

    // sorts the amount in the table
    handleAmountSort = () => {
        
        if (this.state.sort== "(a, b) => a.amount > b.amount ? 1 : -1")
        {
            this.setState({ sort: (a, b) => a.amount < b.amount ? 1 : -1 });
        }
        else {
            this.setState({ sort: (a, b) => a.amount > b.amount ? 1 : -1 });
        }
       
    }

    // sort the date in the table
    handleDateSort = () => {
       if (this.state.sort== "(a, b) => a.date > b.date ? 1 : -1")
        {
            this.setState({ sort: (a, b) => a.date < b.date ? 1 : -1 });
        }
        else {
            this.setState({ sort: (a, b) => a.date > b.date ? 1 : -1 });
        }
      
    }

    // submits the add form
    onSubmit = (e) =>{
    this.handleClose();
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

    this.getExpensesFromDB();
    this.getChart();

    }

    // onchange for the add expense
    onChangeExpense= (e)=>{
        this.setState({
            expense_list: e.target.value
        });
    }

    // opens the add dialog
    handleClickOpen = () => {
        this.setState({
            setOpen: true
        });
    };

    // closes the add dialog
    handleClose = () => {
        this.setState({
            setOpen: false
        });
    };
    
    // opens the edit dialog
    editHandleClickOpen = () => {
        this.setState({
            setEditOpen: true
        });
    };

    // closes the edit dialog
    editHandleClose = () => {
        this.setState({
            setEditOpen: false
        });
    };

    // get the edit data from database
    getEditFormFromDB = (event) =>{
        let index = event.target.getAttribute('data-key');

        axios.get('/api/expense/edit/'+index)
        .then(response=>{
            this.setState({edit_expense_list:response.data});
        });

        this.editHandleClickOpen();
    }

    // onchange for the edit form
    onChangeEditExpense= (e)=>{
        this.setState({
            edit_expense_list: e.target.value
        });
    }

    // update data from the edit form
    onSubmitEditForm = (e) =>{
        this.editHandleClose();
        e.preventDefault();
        const index = document.getElementById("edit_id").value;
        const user = localStorage.getItem('id');
        const form = document.getElementById("editExpForm");
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

        axios.post('/api/expense/update/'+index, formData, headers)
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

        this.getExpensesFromDB();
        this.getChart();
    }

    // delete expense
    onDelete=(event)=>{
        let index = event.target.getAttribute('data-key');
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

    // pagination scrolling
    handlePageChange(pageNumber) {
        let id = localStorage.getItem('id'); 
        axios.get('/api/expense/'+id+'?page='+pageNumber)
        .then(response=>{
            this.setState({
                expenses_list:response.data.data,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page
            });
        });
    }

    // piechart
    getChart = () =>{
        var id = localStorage.getItem('id');
        axios.get('/api/pieChart/'+id)
        .then(response=>{
            this.setState({chartData:response.data});
        });
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    render(){
        if(localStorage.getItem('email') == null){
            return( <Redirect to={'/Login'} /> )
        }

        let filterExpenses = this.state.expenses_list.filter(
            (expenseFilter) => {
                return expenseFilter.category_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return(
            <div>
                <Header />
                <h2 style={{ float: "center", marginLeft: "80px" }}>Dashboard</h2>
                <div style={{ float: "left", overflow: "hidden", marginLeft: "70px", marginTop: "33px", width: "45%"}}>
                    
                    <span role="img" style={{ float: "right", marginLeft: "4px" }}>🔎</span>
                    <div style={{ width: "150px", height: "40px", float: "right"}}>
                        <input type="text" className="form-control" placeholder="Search"
                            value={this.state.search} onChange={this.updateSearch.bind(this)} style={{ height: "30px"}}/>
                    </div>
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
                            filterExpenses.sort(this.state.sort).map(exp=>{
                            return(
                                <tr key={exp.id}>
                                    <th scope="row"></th>
                                        <td>{exp.category_name}</td>
                                        <td>{exp.amount}</td>
                                        <td>{exp.date}</td>
                                        <td>
                                            {/* <Link to={`/EditExpense/${exp.id}`}>Edit</Link> |  */}
                                            <a href="#" data-key={exp.id} onClick={this.getEditFormFromDB}>Edit</a> | 

                                            <a href="#" data-key={exp.id} onClick={this.onDelete}> Delete</a>
                                        </td>
                                </tr>
                            )

                            })

                        }

                    </tbody>
                    </table>
                    
                    <div className="d-flex justify-content-center" style={{ marginTop: "30px" }}>
                        <Pagination
                            activePage = {this.state.activePage}
                            itemsCountPerPage = {this.state.itemsCountPerPage}
                            totalItemsCount = {this.state.totalItemsCount}
                            pageRangeDisplayed = {this.state.pageRangeDisplayed}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass = 'page-link'
                        />
                    </div>

                    <button type="button" className="btn btn-secondary btn-circle btn-l" 
                        style={{ float: "right", fontSize: "20px", borderRadius: "50%", width: "45px" }} 
                        onClick={this.handleClickOpen}>+</button> 
                    
                    {/* dialog for the add expense */}
                    <Dialog open={this.state.setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
                        <DialogContent>

                        <div>

                            <form onSubmit={this.onSubmit} onChange={this.onChangeExpense} id="addExpForm">
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
                                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                                    <Button type="submit">Add Expense</Button>
                                </div>
                            </form>

                        </div>
                        </DialogContent>
                    </Dialog>

                    {/* dialog for the edit form */}

                    <Dialog open={this.state.setEditOpen} onClose={this.editHandleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Expense</DialogTitle>
                        <DialogContent>

                        <div>

                        <form onSubmit={this.onSubmitEditForm} onChange={this.onChangeEditExpense} id="editExpForm">
                            <div className="form-group">
                                <input type="number" id= "edit_id" name="edit_id" value={this.state.edit_expense_list.id} hidden/>
                            </div>
                            <div className="form-group">
                                <input type="Date" id= "edit_date" name="edit_date" className="form-control" placeholder= 'Date'
                                    value={this.state.edit_expense_list.date} required/>
                            </div>
                            <div className="form-group">
                                <input type="number" step="0.01" id= "edit_amount" name="edit_amount" className="form-control" 
                                        placeholder= 'Amount $' value={this.state.edit_expense_list.amount} required/>
                            </div>

                            <div className="input-group mb-3">
                            <select className="custom-select" id="inputGroupSelect02" name="edit_category" value={this.state.edit_expense_list.category_name}>
                                <option>Choose...</option>
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
                                <Button onClick={this.editHandleClose} color="primary">Cancel</Button>

                                <Button type="submit">Update</Button>
                            </div>
                        </form>

                    </div>
                    </DialogContent>
                    </Dialog>

                    
                    
                </div>
                <div style={{ float: "left", overflow: "hidden", marginTop: "25px", marginLeft: "20px", width: "45%" }}>
                    <PieChart dataParentToChild = {this.state.chartData}/>
                </div>
            </div>
        )
    }
}

export default Expenses;