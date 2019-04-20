import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import dummyCustomers from "./CustomersData";
import './CustomerEdit.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
    //TODO: Call API and update the item
    console.log("Form submitted");
  }

  render() {
    const customer = this.state.customer;
    //TODO: Add validations
    return (
      <div className="edit-new-form">
        {customer ?
          (
            <Container>
              <Form
                onSubmit={e => this.handleSubmit(e)}
              >
                <Row>
                  <Col sm>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" defaultValue={customer.name} />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" defaultValue={customer.email} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control type="text" placeholder="Enter your phone number" defaultValue={customer.phone} />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group controlId="formVat">
                      <Form.Label>VAT identification number</Form.Label>
                      <Form.Control type="text" placeholder="Enter your VAT" defaultValue={customer.vatNumber} />
                    </Form.Group>
                  </Col>
                </Row>
                <h3>Delivery Address</h3>
                <Row>
                  <Col sm>
                    <Form.Group controlId="formDeliveryStreet">
                      <Form.Label>Street</Form.Label>
                      <Form.Control type="text" placeholder="Enter the street" defaultValue={customer.delivery_street} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group controlId="formDeliveryCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="Enter the city" defaultValue={customer.delivery_city} />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group controlId="formDeliveryCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control type="text" placeholder="Enter the country" defaultValue={customer.delivery_country} />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group controlId="formDeliveryPostcode">
                      <Form.Label>Postcode</Form.Label>
                      <Form.Control type="text" placeholder="Enter the postcode" defaultValue={customer.delivery_postCode} />
                    </Form.Group>
                  </Col>
                </Row>
                <h3>Billing Address</h3>
                <Row>
                  <Col sm>
                    <Form.Group controlId="formBillingStreet">
                      <Form.Label>Street</Form.Label>
                      <Form.Control type="text" placeholder="Enter the street" defaultValue={customer.billing_street} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group controlId="formBillingCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="Enter the city" defaultValue={customer.billing_city} />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group controlId="formBillingCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control type="text" placeholder="Enter the country" defaultValue={customer.billing_country} />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group controlId="formBillingPostcode">
                      <Form.Label>Postcode</Form.Label>
                      <Form.Control type="text" placeholder="Enter the postcode" defaultValue={customer.billing_postCode} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit">Submit form</Button>
              </Form>
            </Container>
          ) :
          (<span>Customer with ID: {this.state.customerId} does not exist!</span>)
        }
      </div>
    )
  }
}

export default CustomerEdit;