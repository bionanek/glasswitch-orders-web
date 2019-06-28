import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap/'
import './CustomerForm.scss'
import IdNotFound from '../../common/IdNotFound'

function CustomerForm(props) {
	const [isValidated, setIsValidated] = useState(false)

	const getFormValues = form => {
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

	const handleDataConfirm = async form => {
		setIsValidated(true)
		const customer = getFormValues(form)
		props.onSubmit(customer)
	}

	const onSubmit = event => {
		const form = event.currentTarget
		event.preventDefault()

		if (form.checkValidity() === false) {
			event.stopPropagation()
		}
		handleDataConfirm(form)
	}

	const customerFormView = () => {
		return (
			<Container className="edit-new-form">
				<Form onSubmit={onSubmit} validated={isValidated}>
					<Row>
						<Col sm>
							<Form.Group controlId="formName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Enter your name"
									defaultValue={props.customer.name}
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
									defaultValue={props.customer.email}
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
									defaultValue={props.customer.phone}
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
									defaultValue={props.customer.vatNumber}
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
									defaultValue={props.customer.delivery_street}
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
									defaultValue={props.customer.delivery_city}
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
									defaultValue={props.customer.delivery_country}
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="formDeliveryPostcode">
								<Form.Label>Postcode</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter the postcode"
									defaultValue={props.customer.delivery_postCode}
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
									defaultValue={props.customer.billing_street}
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
									defaultValue={props.customer.billing_city}
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
									defaultValue={props.customer.billing_country}
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="formBillingPostcode">
								<Form.Label>Postcode</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter the postcode"
									defaultValue={props.customer.billing_postCode}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col>
							<Button variant="success" type="submit" >
								{props.submitText}
							</Button>

							<Button onClick={() => props.onCancel()} variant="danger" className="cancel-button" >
								Cancel
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		)
	}
	return <> {props.customer ? customerFormView() : IdNotFound()} </>
}

export default withRouter(CustomerForm)
