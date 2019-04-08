import React, { Component } from 'react';
import Pizza from '../components/Pizza'

class PizzaList extends Component {

  state={
    pizzas: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => (
      this.setState({pizzas: pizzas})
    ))
  }

  render() {
    let pizzas = this.state.pizzas.map(pizza => (
      <Pizza pizza={pizza} onEdit={this.props.onEdit}/>
    ))
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {pizzas}
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
