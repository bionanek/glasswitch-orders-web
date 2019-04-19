import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import dummyCustomers from "./CustomersData";

class CustomerEdit extends Component {
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

  handleSubmit(event) {
    alert("form submitted");
  }

  render() {
    return (
      <Form
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" defaultValue={this.state.customer.name}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" defaultValue={this.state.customer.email}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text" placeholder="Enter your phone number" defaultValue={this.state.customer.phone}/>
        </Form.Group>
        <Form.Group controlId="formVat">
          <Form.Label>VAT identification number</Form.Label>
          <Form.Control type="text" placeholder="Enter your VAT" defaultValue={this.state.customer.vatNumber}/>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    )
  }
}

export default CustomerEdit;