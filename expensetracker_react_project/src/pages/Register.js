import React, { Component } from 'react'
import propTypes from 'prop-types';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class Register extends Component {
 
    constructor(){
        super();
      }
      state = {
    
         //Creats an object that can store the variables
         data: {
           username: '',
           email: '',
           password: '',
           admin:'false'
         },
         flag:false,
         loading: false,
         errors: {}
       };
    
       //Checks for the change of state and then assigns the form data to the state.
       onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});
    
       onSubmit = (e) => {
          e.preventDefault();
          const form = document.getElementById("registerID");
          const formData = new FormData(form);
          const headers = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'crossOrigin': true,
                'Access-Control-Allow-Origin' : '*'
                }
            }
    
          axios.post('/api/register', formData, headers)
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
    
    
       };
    
    render() {

        const {data} = this.state;
        if(this.state.flag == true){
          return( <Redirect to={'/Login'} /> )
        }

        return(
           <div className="card" style={{ width: "34%", marginLeft: "30%", marginTop: "100px", marginBottom: "50px"}}>
             <h5 className="card-header info-color white-text text-center py-4">
               <strong>Sign up</strong>
             </h5>
             <div className="card-body px-lg-5 pt-0">
               <form onSubmit = {this.onSubmit} id="registerID">
   
               <div className="md-form mt-0">
                   <input type="text" placeholder="Enter Username" id="username" name="name" className="form-control" 
                            onChange = {this.onChange} style={{ borderTop: "0",borderLeft: "0",borderRight: "0", margin: "20px"}} required/>
               </div>
   
               <div className="md-form mt-0">
                   <input type="email" placeholder="Enter Email" id="email" name="email" className="form-control" 
                            onChange = {this.onChange} style={{ borderTop: "0",borderLeft: "0",borderRight: "0", margin: "20px"}} required/>

               </div>
   
               <div className="md-form">
                   <input type="password" placeholder="Enter Password" id="password" name="password"  onChange = {this.onChange} 
                      className="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock"
                      style={{ borderTop: "0",borderLeft: "0",borderRight: "0", margin: "20px"}} required/>
               </div>
   
               <div className="md-form">
                   <input type="password" placeholder="Confirm Password" id="confirm_password" name="confirm_password" onChange = {this.onChange} 
                      className="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock"
                      style={{ borderTop: "0",borderLeft: "0",borderRight: "0", margin: "20px"}} required/>
               </div>
               
   
               <button className="btn btn-outline-secondary btn-rounded btn-block my-4 waves-effect z-depth-0"
                        type="submit" style={{ margin: "20px" }}>Register Now</button>

                <p>Already have an account?
                    <a href="/Login" style={{ marginLeft: "7px" }}>Sign in</a>
                </p>
               </form>
             </div>
           
           </div>
         
   
        );
       }
}

Register.propTypes = {
    submit: propTypes.func.isRequired
  };
 

export default Register;