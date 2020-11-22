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
                              'rgba(255, 236, 33)',
                              'rgba(55, 138, 255)',
                              'rgba(255, 163, 47)',
                              'rgba(245, 79, 82)',
                              'rgba(147, 240, 59)',
                              'rgba(149, 82, 234)'
                          ],
                          borderWidth: 1
                      }]
                  }}
              />
      )
}
export default PieChart;
