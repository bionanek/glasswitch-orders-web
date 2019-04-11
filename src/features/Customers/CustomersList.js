import React, { Component } from "react";
import "./CustomersList.scss";
import dummyCustomers from "./CustomersData";
import SimpleList from "../../components/SimpleList/SimpleList";

class CustomersList extends Component {
  customersListObjects = dummyCustomers.map(customer => {
    const onClick = () => {
      console.log("Clicked " + customer.name);
      customer.name = "dupa";
    };

    return {
      title: customer.name,
      subTitle: customer.email,
      onClickEvent: onClick
    };
  });

  render() {
    return (
      <div className="customers-list-wrapper">
        <div className="header">
          <h1>List Of Customers</h1>
        </div>
        <SimpleList elements={this.customersListObjects} />
      </div>
    );
  }
}

export default CustomersList;
