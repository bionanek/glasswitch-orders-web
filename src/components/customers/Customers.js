import React from "react";
import logo from "../../logo.svg";
import CustomersList from "./list/CustomersList";
import "./Customers.scss";

const Customers = () => {
  return (
    <div className="customers">
      <header className="customers-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>List Of Customers</h1>
      </header>
      <CustomersList className="customers-list" />
    </div>
  );
};

export default Customers;
