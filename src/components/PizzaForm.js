import React from "react"

class PizzaForm extends React.Component {

  // state={
  //   topping: "",
  //   size: "",
  //   vegetarian: ""
  // }

  handleSubmit = e => {
    // console.log(this.props.pizza.id);
    this.props.onSubmit(this.props.pizza.id)
    // this.setState({
    //   topping: "",
    //   size: "",
    //   vegetarian: ""
    // });
  }

  changeHandler = (e) => {
    this.props.onChange(e, e.target.value)
  }

  render() {
    console.log(this.props);
    return(
      <div className="form-row">
        <div className="col-5" id='topping'>
          <input type="text" className="form-control" placeholder="Pizza Topping" value={this.props.pizza.topping} onChange={this.changeHandler}/>
          </div>
          <div className="col" id='size'>
            <select value={this.props.pizza.size} className="form-control" onChange={this.changeHandler}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check" id='vegetarian' onChange={this.changeHandler}>
              <input className="form-check-input" type="radio" value="Vegetarian" checked={this.props.pizza.vegetarian === 'Yes'}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check" id='vegetarian' onChange={this.changeHandler}>
              <input className="form-check-input" type="radio" value="Not Vegetarian" checked={this.props.pizza.vegetarian === 'No'}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>

      )
  }
}

export default PizzaForm
