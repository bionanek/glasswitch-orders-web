import React from "react";
import logo from "../../logo.svg";
import CustomersList from "./list/CustomersList";
import "./Customers.scss";

const Customers = () => {
  return (
    <div className="customers">
      <CustomersList className="customers-list" />
    </div>
  );
};

export default Customers;
