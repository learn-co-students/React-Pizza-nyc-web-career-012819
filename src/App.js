import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'


class App extends Component {

  state ={
    pizzas: [],
    editPizza: false,
    topping: '',
    size: '',
    vegetarian: 1
  }


  componentDidMount(){
    console.log('mounting')
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas}))
  }

  editButtonHander = (props) => {
    this.setState({id: props.id})
    this.setState({topping: props.topping})
    this.setState({size: props.size})
    this.setState({vegetarian: props.vegetarian})
  }

  editToppingOnChange = (e) => {
    let topping = e.target.value
    this.setState({topping: topping})
  }

  editSizeOnChange = (e) => {
    let size = e.target.value
    this.setState({size: size})
  }

  editVegitarianChange = () => {
    this.setState({vegetarian: !this.state.vegetarian})
    }


    submitHandler = () =>{
      const id = this.state.id
      const topping = this.state.topping
      const size = this.state.size
      const vegetarian = this.state.vegetarian

      fetch(`http://localhost:3000/pizzas/${id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topping: topping,
          size: size,
          vegetarian: vegetarian
        })
      })
      .then(res => res.json())
      .then(json => this.setInitialState())

    }

    setInitialState = () => {
      this.componentDidMount()
      this.setState({editPizza: false})
      this.setState({size: ''})
      this.setState({vegetarian: 1})
    }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm topping={this.state.topping} editToppingOnChange={this.editToppingOnChange}
        size={this.state.size}
        editSizeOnChange={this.editSizeOnChange}
        vegetarian={this.state.vegetarian}
        editVegitarianChange={this.editVegitarianChange}
        submitHandler={this.submitHandler}
          />
        <PizzaList pizzas={this.state.pizzas} editButtonHander={this.editButtonHander}/>
      </Fragment>
    );
  }
}

export default App;
