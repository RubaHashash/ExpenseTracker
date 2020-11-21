import React, { Component } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import Header from './Header';
import axios from 'axios';



function PieChart(props) {

  const dataCat = props.dataParentToChild.map((data2) => { return data2.category_name })
  const dataTot = props.dataParentToChild.map((data2) => { return data2.sum })
  return (
              <Pie
                  data = {{
                      labels:dataCat,
                      datasets :[{
                          label: 'Expenses',
                          data:dataTot,
                          backgroundColor: [
                              'rgba(255, 241, 201)',
                              'rgba(247, 183, 163)',
                              'rgba(234, 95, 137)',
                              'rgba(155, 49, 146)',
                              'rgba(87, 22, 126)',
                              'rgba(43, 11, 63)'
                          ],
                          // borderColor: [
                          //     'rgba(255, 99, 132, 1)',
                          //     'rgba(54, 162, 235, 1)',
                          //     'rgba(255, 206, 86, 1)',
                          //     'rgba(75, 192, 192, 1)',
                          //     'rgba(153, 102, 255, 1)',
                          //     'rgba(255, 159, 64, 1)'
                          // ],
                          borderWidth: 1
                      }]
                  }}
              />
      )
}
export default PieChart;
