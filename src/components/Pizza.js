import React, { Component } from 'react';
import PizzaForm from './PizzaForm'

class Pizza extends Component {


  render(){
    return(
      <tr>
        <td>{this.props.topping}</td>
        <td>{this.props.size}</td>
        <td>{this.props.vegetarian ? "Yes" : "No"}</td>
        <td><button type="button" className="btn btn-primary" onClick={()=>this.props.editButtonHander(this.props)}>Edit Pizza</button></td>
      </tr>
    )
  }
}

export default Pizza
