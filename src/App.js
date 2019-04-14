import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/Home";
import Customers from "./components/Customers";
import About from "./components/About";
import RouteError from "./components/RouteError";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation />
            <div className="content">
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/customers" component={Customers} />
                <Route path="/about" component={About} />
                <Route component={RouteError} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
