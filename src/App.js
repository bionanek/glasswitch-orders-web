import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.scss";
import CustomersList from "./features/Customers/CustomersList.js";
import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(faTrashAlt);
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
