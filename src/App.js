import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state={
    topping: "",
    size: "",
    vegetarian: "",
    id: ""
  }

  handleEdit = (topping, size, vegetarian, pizzaId) => {
    this.setState({topping: topping, size: size, vegetarian: vegetarian, id: pizzaId})
  }

  handleChange = (e, value) => {
    let statePlace = e.target.parentNode.id
    console.log(statePlace);
    console.log(value);
    if (statePlace === 'topping') {
      this.setState({ topping: value })
    } else if (statePlace === 'size') {
      this.setState({ size: value })
    } else if (statePlace === 'vegetarian') {
      if (value === 'Vegetarian') {
        this.setState({ vegetarian: 'Yes' })
      } else if (value === 'Not Vegetarian') {
        console.log('not veg');
        this.setState({ vegetarian: 'No' })
      }
      // this.setState({ vegetarian: value })
    }
  }

  handleSubmit = (pizzaId) => {
    console.log(pizzaId);
    fetch(`http://localhost:3000/pizzas/${pizzaId}`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(data => (
      this.setState({data})
    ))
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
        <PizzaList onEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
