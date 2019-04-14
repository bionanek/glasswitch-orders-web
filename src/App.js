import React, { Component } from "react";
import "./App.scss";
import CustomersList from "./components/Customers/CustomersList.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomersList />
      </div>
    );
  }
}

export default App;
