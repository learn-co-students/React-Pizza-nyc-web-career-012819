import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    id: 0,
    topping: '',
    size: '',
    vegetarian: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
      .then(resp => resp.json())
      .then(pizzas => this.setState({pizzas}))
  }

  editHandler = (pizzaObj) => {
    this.setState({
      id: pizzaObj.id,
      topping: pizzaObj.topping,
      size: pizzaObj.size,
      vegetarian: pizzaObj.vegetarian
    })
  }

  changeHandler = (e) => {
    if (e.target.name === "vegetarian") {
      this.setState({vegetarian: true})
    } else if (e.target.name === "not-vegetarian") {
      this.setState({vegetarian: false})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  updatePizza = (newPizza) => {
    const filteredPizzas = this.state.pizzas.filter(pizza => {
      return !(pizza.id === newPizza.id)
    });
    filteredPizzas.unshift(newPizza)
    this.setState({pizzas: filteredPizzas})
  }


  handleSubmit = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
    .then(resp => resp.json())
    .then(pizza => this.updatePizza(pizza))
  }

  render() {

    const pizzas = this.state.pizzas

    return (
      <Fragment>
        <Header/>
        <PizzaForm
          handleSubmit={this.handleSubmit}
          changeHandler={this.changeHandler}
          topping={this.state.topping}
          vegetarian={this.state.vegetarian}
          size={this.state.size}
        />
        <PizzaList
          editHandler={this.editHandler}
          pizzas={pizzas}
        />
      </Fragment>
    );
  }
}

export default App;
