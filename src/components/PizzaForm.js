import React from "react";

class PizzaForm extends React.Component {
  render() {
    const { pizza } = this.props;
    return (
      <div className="form-row">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Pizza Topping"
            name="topping"
            value={pizza.topping}
            onChange={this.props.changeListener}
          />
        </div>
        <div className="col">
          <select
            value={pizza.size}
            name="size"
            onChange={this.props.changeListener}
            className="form-control"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Vegetarian"
              checked={pizza.vegetarian ? true : false}
              onChange={this.props.changeListener}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Not Vegetarian"
              checked={!pizza.vegetarian ? true : false}
              onChange={this.props.changeListener}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button
            type="submit"
            className="btn btn-success"
            onClick={e => this.props.submitListener(e, pizza)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default PizzaForm;
