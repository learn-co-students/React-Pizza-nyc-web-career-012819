import React from "react"

class Pizza extends React.Component {

  handleEdit = e => {

    let topping = e.target.parentNode.previousSibling.previousSibling.previousSibling.innerText
    let size = e.target.parentNode.previousSibling.previousSibling.innerText
    let vegetarian = e.target.parentNode.previousSibling.innerText
    let pizzaId = parseInt(e.target.dataset.id)
    // console.log(pizzaId);
    this.props.onEdit(topping, size, vegetarian, pizzaId)
  }

  render() {
    return(
      <tr>
        <td>{this.props.pizza.topping}</td>
        <td>{this.props.pizza.size}</td>
        <td>{this.props.pizza.vegetarian ? 'Yes' : 'No'}</td>
        <td><button type="button" className="btn btn-primary" data-id={this.props.pizza.id} onClick={this.handleEdit}>Edit Pizza</button></td>
      </tr>
    )
  }
}

export default Pizza
