import React, { Component } from "react";
import "./CustomersList.scss";
import dummyCustomers from "./CustomersData";
import SimpleList from "../common/SimpleList/SimpleList";
class CustomersList extends Component {
  customersListObjects = dummyCustomers.map((customer, index) => {
    return {
      title: customer.name,
      subTitle: customer.email,
      deletable: customer.deletable,
      deleteHandler: null
    };
  });

  render() {
    return (
      <div className="customers-list-wrapper">
        <div className="header">
          <h1>List Of Customers</h1>
        </div>
        <SimpleList
          elements={this.customersListObjects}
          deletable={true}
          editable={false}
        />
      </div>
    );
  }
}

export default CustomersList;
