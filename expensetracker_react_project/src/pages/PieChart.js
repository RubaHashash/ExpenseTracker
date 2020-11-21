import React, { Component } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import Header from './Header';
import axios from 'axios';


class PieChart extends Component {

    constructor(){
        super()
        this.state={
            categories:[],
            labels: [],
            datasets: [
                {
                  label: 'Rainfall',
                  backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                    '#00A6B4',
                    '#6800B4'
                  ],
                  hoverBackgroundColor: [
                  '#501800',
                  '#4B5000',
                  '#175000',
                  '#003350',
                  '#35014F'
                  ],
                  data: [55,75]
                }
              ]
        }
    }

    componentDidMount(){
        var id = localStorage.getItem('id');
        axios.get('/api/pieChart/'+id)
        .then(response=>{
            this.setState({categories:response.data});
        });

    }

    // dataChart=()=>{
    //   var category = this.state.categories;
    //   console.log(category.length);
    //   let names_list=[];
    //   let sum_list=[];
    //   for(var i=0; i<category.length;i++){
    //     console.log(category[i]);
    //     names_list.push(category[i].category_name);
    //     sum_list.push(category[i].sum);
    //   }
    //   console.log(names_list);

    // }

    render() {
        return (
          <div>
            <Header />
            <div style={{ width: "700px", marginTop: "80px", marginLeft: "250px" }}>
            <h2 style={{ float: "left", marginLeft: "150px", marginBottom: "25px" }}>Categories Pie Chart</h2>
                <Pie
                data={this.state}
                options={{
                    title:{
                    display:true,
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                />
            </div>
    
            
          </div>
        );
      }
    
}

export default PieChart;
