import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
  state = {
    pizzas: [],
    pizza: {
      topping: "",
      size: "Small",
      vegetarian: false
    }
  };

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then(r => r.json())
      .then(pizzas => this.setState({ pizzas }));
  }

  clickListener = pizza => {
    this.setState({ pizza: pizza }, () => console.log(this.state.pizza));
  };

  submitListener = (e, pizza) => {
    e.preventDefault();
    const pizzaIDs = this.state.pizzas.map(pizzaObj => {
      return pizzaObj.id;
    });
    if (pizzaIDs.includes(pizza.id)) {
      this.patchRequest(pizza);
    } else {
      this.postRequest(pizza);
    }
  };

  postRequest = pizza => {
    fetch("http://localhost:3000/pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian
      })
    })
      .then(r => r.json())
      .then(pizza => this.setState({ pizzas: [...this.state.pizzas, pizza] }));
  };
  patchRequest = pizza => {
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian
      })
    })
      .then(r => r.json())
      .then(pizza => {
        const newPizza = this.state.pizzas.map(oldPizza => {
          return oldPizza.id === pizza.id ? pizza : oldPizza;
        });
        this.setState({ pizzas: newPizza });
      });
  };

  changeListener = e => {
    if (
      e.target.value === "Vegetarian" ||
      e.target.value === "Not Vegetarian"
    ) {
      this.setState({
        pizza: {
          ...this.state.pizza,
          vegetarian: !this.state.vegetarian
        }
      });
    } else {
      this.setState({
        pizza: {
          ...this.state.pizza,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          pizza={this.state.pizza}
          changeListener={this.changeListener}
          submitListener={this.submitListener}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          clickListener={this.clickListener}
        />
      </Fragment>
    );
  }
}

export default App;
