import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './CustomerForm.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom'

class CustomerForm extends Component {
  constructor(props) {
    super(props)

    // Could be set to false, but IMHO it is more user friendly to display what is requiered 
    this.state = { validated: true }
  }

  static getFormValues(form) {
    const customer = {
      name: form.formName.value,
      email: form.formEmail.value,
      phone: form.formPhone.value,
      vatNumber: form.formVat.value,
      delivery_street: form.formDeliveryStreet.value,
      delivery_city: form.formDeliveryCity.value,
      delivery_country: form.formDeliveryCountry.value,
      delivery_postCode: form.formDeliveryPostcode.value,
      billing_street: form.formBillingStreet.value,
      billing_city: form.formBillingCity.value,
      billing_country: form.formBillingCountry.value,
      billing_postCode: form.formBillingPostcode.value,
    }

    return customer
  }

  onSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const customer = CustomerForm.getFormValues(form)
      this.props.onSubmit(event, customer)
    }

    this.setState({ validated: true });
  }

  render() {
    const { customer } = this.props
    const { validated } = this.state;
    // TODO: Add validations
    return (
      <div className="edit-new-form">
        {customer ? (
          <Container>
            <Form onSubmit={e => this.onSubmit(e)} noValidate validated={validated}>
              <Row>
                <Col sm>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter your name"
                      defaultValue={customer.name}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter email"
                      defaultValue={customer.email}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      defaultValue={customer.phone}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group controlId="formVat">
                    <Form.Label>VAT identification number</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter your VAT"
                      defaultValue={customer.vatNumber}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>Delivery Address</h3>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group controlId="formDeliveryStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter the street"
                      defaultValue={customer.delivery_street}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group controlId="formDeliveryCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter the city"
                      defaultValue={customer.delivery_city}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group controlId="formDeliveryCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter the country"
                      defaultValue={customer.delivery_country}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group controlId="formDeliveryPostcode">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the postcode"
                      defaultValue={customer.delivery_postCode}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>Billing Address</h3>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group controlId="formBillingStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter the street"
                      defaultValue={customer.billing_street}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group controlId="formBillingCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter the city"
                      defaultValue={customer.billing_city}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group controlId="formBillingCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter the country"
                      defaultValue={customer.billing_country}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group controlId="formBillingPostcode">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the postcode"
                      defaultValue={customer.billing_postCode}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" variant="success">{this.props.submitText}</Button>
                  <Button variant="danger" className="cancel-button" onClick={() => this.props.onCancel()}>Cancel</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        ) : (
            <span>
              Customer with ID: {this.props.match.params.id} does not exist!
            </span>
          )}
      </div>
    )
  }
}

export default withRouter(CustomerForm)