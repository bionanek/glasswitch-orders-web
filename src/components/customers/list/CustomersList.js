import React, { Component } from "react";
import dummyCustomers from "../CustomersData";
import SimpleList from "../../common/simpleList/SimpleList";

class CustomersList extends Component {
  customersListObjects = dummyCustomers.map(customer => {
    return {
      title: customer.name,
      subTitle: customer.email,
      deletable: customer.deletable,
      deleteHandler: null,
      clickHandler: () => console.log("clicked")
    };
  });

  render() {
    return (
      <div className="customers-list-wrapper">
        <SimpleList
          elements={this.customersListObjects}
          deletable={true}
          editable={true}
          clickable={true}
        />
      </div>
    );
  }
}

export default CustomersList;
