import React, { Component } from "react";
import dummyCustomers from "../CustomersData";
import SimpleList from "../../common/simpleList/SimpleList";
import { withRouter } from 'react-router-dom'

class CustomersList extends Component {
  customersListObjects = dummyCustomers.map(customer => {
    return {
      title: customer.name,
      subTitle: customer.email,
      deletable: customer.deletable,
      editHandler: (e) => {
        e.stopPropagation();
        const editUrl = `customers/${customer.id}/edit`;
        this.props.history.push(editUrl);
      },
      clickHandler: () => {
        this.props.history.push(`customers/${customer.id}`);
      },
      deleteHandler: null,
    };
  }, this);

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

export default withRouter(CustomersList);