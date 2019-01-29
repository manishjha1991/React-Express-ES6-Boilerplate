import React, { Component } from "react";
import "../css/Device.css";
class NameForm extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      alert('The value is: ' + this.input.value);
      localStorage.setItem('myData', "manish");
      e.preventDefault();
    }
  
    render() {
      return (
        <form  className ="form__row" onSubmit={this.handleSubmit}>
          <div className="row">
          <label className="label" >
            Email:
            <input type="text" ref={(input) => this.input = input} />
          </label>
          </div>
          
          <div className="row">
              
        <label className="label" >
            Password:
            <input type="text"  ref={(input) => this.input = input} />
          </label>
         </div>
          
          <div className="row">
              <input className="btnClass" type="submit" value="Submit" />
            </div>
        </form>
      );
    }
  }
  export default NameForm;