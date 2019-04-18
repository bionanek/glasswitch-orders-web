import React, { Component } from "react";
import dummyCustomers from "./CustomersData";

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    const customerId = parseInt(this.props.match.params.id);

    const customer = dummyCustomers.find(cust => {
      return cust.id === customerId;
    })

    this.state = {
      customer: customer,
      customerId: customerId,
    }
  }

  render() {
    return (
      <div className="customer-detail">
        {this.state.customer ?
          (<span>{this.state.customer.name}</span>) :
          (<span>Customer with ID: {this.state.customerId} does not exist!</span>)
        }
      </div>
    );
  }
}

export default CustomerDetail;
