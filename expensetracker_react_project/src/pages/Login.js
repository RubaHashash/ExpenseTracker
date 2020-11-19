import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Register from './Register';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
   
  constructor(){
    super();
    this.state = {

      //creating the data variable that holds the email and password to be passed on
      data: {
        email: '',
        password: ''
      },
      flag: false,
      loading: false,
      errors: {}
    };
  }


  //Checks for the change of state and then loads the data entered in the form to the state.
  onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});

  onSubmit = (e) => {
    //Prevents the page from refreshing while submitting a form
    e.preventDefault();
    const form = document.getElementById("loginID");
    const formData = new FormData(form);
    const headers = {
     headers:{
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept': 'application/json',
         'crossOrigin': true,
         'Access-Control-Allow-Origin' : '*'
         }
     }

     axios.post('http://localhost:8000/api/login', formData, headers)
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
         localStorage.setItem('email', response.data.user.email);
         localStorage.setItem('id', response.data.user.id);
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



  };

    render() {
      const {data} = this.state;
      if(localStorage.getItem('email')){
        return( <Redirect to={'/Expenses'} /> )
      }
        return(
           <div className="card" style={{ width: "34%", marginLeft: "30%", marginTop: "100px", marginBottom: "50px" }}>
             <h5 className="card-header info-color white-text text-center py-4">
               <strong>Sign In</strong>
             </h5>
             <div className="card-body px-lg-5 pt-0">
               <form onSubmit = {this.onSubmit} id="loginID">
   
               <div className="md-form mt-0">
                   <input type="email" placeholder="Enter Email" id="email" name="email" className="form-control" 
                            onChange = {this.onChange} style={{ borderTop: "0",borderLeft: "0",borderRight: "0", margin: "20px"}} required/>

               </div>
   
               <div className="md-form">
                   <input type="password" placeholder="Enter Password" id="password" name="password"  onChange = {this.onChange} 
                      className="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock"
                      style={{ borderTop: "0",borderLeft: "0",borderRight: "0", margin: "20px"}} required/>
               </div>
   

               <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                        type="submit" style={{ margin: "20px" }}>Login</button>

                <p>Not registered?
                    <a href="/Register" style={{ marginLeft: "7px" }}>Create an account</a>
                </p>
               </form>
             </div>
           </div>
   
        );
    }
}

export default Login;
