import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    editPizza: {
      id: null,
      pizzaTopping: '',
      size: null,
      vegetarian: false
    },
    edit: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzaList => this.setState({
      pizzas: pizzaList
    }))
  }

  newPizza = (newPizza) => {
    console.log(newPizza);
    fetch(`http://localhost:3000/pizzas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topping: newPizza.pizzaTopping,
        size: newPizza.size,
        vegetarian: newPizza.vegetarian
      })
    })
    .then(resp => resp.json())
    .then(newP => {
      this.setState({
        pizzas: [...this.state.pizzas, newP]
      })
    })
  }

  editPizzaHandler = (editThisPizza) => {
    this.setState({
      edit: true,
      editPizza: {
        id: editThisPizza.id,
        pizzaTopping: editThisPizza.topping,
        size: editThisPizza.size,
        vegetarian: editThisPizza.vegetarian
      }
    }, () => {console.log(this.state)})
  }

  onChangeCheckHandler = (e) => {
    if(e.target.value === "Vegetarian") {
      this.setState({editPizza: {...this.state.editPizza, vegetarian: true}})
    } else if(e.target.value === "Not Vegetarian"){
      this.setState({editPizza: {...this.state.editPizza, vegetarian: false}})
    }
  }


  onChangeToppingHandler = (e) => {
    this.setState({
      editPizza: {
        ...this.state.editPizza,
        pizzaTopping: e.target.value
      }
    })
  }

  onChangeSizeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      editPizza: {
        ...this.state.editPizza,
        size: e.target.value
      }
    })
  }


  submitHandler = (e) => {
    e.preventDefault()
    if (this.state.edit) {
      this.editPizzaFetchHandler(this.state.editPizza)
    } else {
      this.newPizza(this.state.editPizza)
    }
  }

  editPizzaFetchHandler = (editPizza) => {
    fetch(`http://localhost:3000/pizzas/${editPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topping: editPizza.pizzaTopping,
        size: editPizza.size,
        vegetarian: editPizza.vegetarian
      })
    })
    .then(resp => resp.json())
    .then(newP => {
      console.log(newP)
    })
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm newPizza={this.newPizzaHandler} pizza={this.state.editPizza} onChangeCheckHandler={this.onChangeCheckHandler} onChangeToppingHandler={event => this.onChangeToppingHandler(event)} onChangeSizeHandler={this.onChangeSizeHandler} submitHandler={this.submitHandler}/>
        <PizzaList
          pizzas={this.state.pizzas}
          editPizza={this.editPizzaHandler}
        />
      </Fragment>
    );
  }
}

export default App;
