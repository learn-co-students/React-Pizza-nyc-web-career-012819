import React from "react"

const PizzaForm = (props) => {
  console.log(props);
  return(
    <div className="form-row">
    <div className="col-5">
    <input type="text" className="form-control" placeholder="Pizza Topping" value={
      //Pizza Topping Should Go Here
      props.pizza.pizzaTopping
    } onChange={props.onChangeToppingHandler}/>
    </div>
    <div className="col" onChange={props.onChangeSizeHandler}>
    <select value={props.pizza.size} className="form-control">
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
    </select>
    </div>
    <div className="col" >
    <div className="form-check">
    <input className="form-check-input" type="radio" value="Vegetarian" checked={props.pizza.vegetarian} onChange={props.onChangeCheckHandler}/>
    <label className="form-check-label">
    Vegetarian
    </label>
    </div>
    <div className="form-check">
    <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.pizza.vegetarian} onChange={props.onChangeCheckHandler}/>
    <label className="form-check-label">
    Not Vegetarian
    </label>
    </div>
    </div>
    <div className="col">
    <button type="submit" className="btn btn-success" onClick={props.submitHandler}>Submit</button>
    </div>
    </div>

  )

}

export default PizzaForm
