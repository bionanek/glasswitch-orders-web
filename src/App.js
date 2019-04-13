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
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <ol className="App-menu">
            <li><div>Dupa1</div></li>
            <li><div>Dupa2</div></li>
            <li><div>Dupa3</div></li>
            <li><div>Dupa4</div></li>
          </ol>
          <p>
            Hello <strong>Glass Witch</strong>! <br /> 
            Let's start <strong>CODING</strong>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
