import React, { Component } from "react";
import dummyCustomers from "./CustomersData";
import DetailElement from "../common/DetailElement";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CustomerDetail.scss';

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
    const customer = this.state.customer;

    return (
      <div className="customer-detail">
        {customer ?
          (
            <Container>
              <h1>{customer.name}</h1>
              <Row>
                <DetailElement header="Email:" value={customer.email} />
                <DetailElement header="Phone:" value={customer.phone} />
                <DetailElement header="VAT identification number:" value={customer.vatNumber} />
              </Row>
              <h2>Delivery address</h2>
              <Row>
                <DetailElement header="Street:" value={customer.delivery_street} />
                <DetailElement header="City:" value={customer.delivery_city} />
                <DetailElement header="Country:" value={customer.delivery_country} />
                <DetailElement header="Postcode:" value={customer.delivery_postCode} />
              </Row>
              <h2>Billing address</h2>
              <Row>
                <DetailElement header="Street:" value={customer.billing_street} />
                <DetailElement header="City:" value={customer.billing_city} />
                <DetailElement header="Country:" value={customer.billing_country} />
                <DetailElement header="Postcode:" value={customer.billing_postCode} />
              </Row>
            </Container>
          ) :
          (<span>Customer with ID: {this.state.customerId} does not exist!</span>)
        }
      </div>
    );
  }
}

export default CustomerDetail;
