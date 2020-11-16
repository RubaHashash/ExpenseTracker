import { render } from '@testing-library/react';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

function ViewExpense(props){
    return(
        props.data.expenses_list.map(exp =>{
            return(
                <div key={exp.id}>
                    <h1>{exp.date}</h1>
                    <h2>{exp.amount}</h2>
                </div>
            )

        })
    )
}

export default ViewExpense;