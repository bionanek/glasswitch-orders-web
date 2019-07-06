import React, { useState, useReducer, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { CustomerReducers, InitialCustomerState, onDeleteConfirm } from './CustomerReducers'
import CustomersApiService from '../../../utils/api/customersApiService'
import LoadingView from '../../common/LoadingView'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import './CustomerCRUD.scss'
import SimpleList from '../../common/simpleList/SimpleList'
import OrdersApiService from '../../../utils/api/ordersApiService';

export default function CustomersCRUD(props) {
	const [customerStates, customerDispatch] = useReducer(CustomerReducers, InitialCustomerState)
	const [isValidated, setIsValidated] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerOrders, setCustomerOrders] = useState([])

  const ordersReactiveObjects = ordersList => {
		return ordersList.map(order => {
			const orderRO = { ...order }

			orderRO.clickHandler = () => {
				props.history.push(`/orders/${order.id}`)
			}

			orderRO.editHandler = event => {
				event.stopPropagation()
				props.history.push(`/orders/${order.id}/edit`)
			}

			orderRO.deleteHandler = async orderId => {
				const deleteResult = await OrdersApiService.deleteOrder(orderId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
          const fetchedCustomer = await CustomersApiService.getCustomerById(props.match.params.id)
					setCustomerOrders(ordersReactiveObjects(fetchedCustomer.orders))
				}
			}
			return orderRO
		})
  }

	const renderDetailsView = async () => {
		const fetchedCustomer = await CustomersApiService.getCustomerById(props.match.params.id)
    setCustomerOrders(ordersReactiveObjects(fetchedCustomer.orders))

		customerDispatch({
			type: 'CUSTOMER_DATA_INIT',
			customer: fetchedCustomer,
			detailsView: true,
		})
	}

	const renderEditView = async () => {
		const fetchedCustomer = await CustomersApiService.getCustomerById(props.match.params.id)
    setCustomerOrders(ordersReactiveObjects(fetchedCustomer.orders))

		customerDispatch({
			type: 'CUSTOMER_DATA_INIT',
			customer: fetchedCustomer,
		})
	}
  
	const handleFormChange = event => {
		const currentCustomer = customerStates.customer
		const { id, name, value } = event.target
		switch (id) {
			default:
				currentCustomer[name] = value
				break
		}
		customerDispatch({ type: 'HANDLE_FORM_CHANGE', currentCustomer })
	}

	const handleDataConfirm = async () => {
    setIsValidated(true)
		const currentCustomer = customerStates.customer    
    delete currentCustomer.orders
    await CustomersApiService.updateCustomer(props.match.params.id, currentCustomer)
		props.history.push(`/customers/`)
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		event.preventDefault()
		if (form.checkValidity() === false) event.stopPropagation()
		handleDataConfirm()
	}

	useEffect(() => {
		if (props.match.path.split(':id/')[1] === 'edit') renderEditView()
		else renderDetailsView()
	}, [])

	const customerCRUDView = () => {
		return (
			<Container className="customer-crud">
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Row>
						<Col sm>
							<Form.Group controlId="name">
								<Form.Label>Customer Name</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="name"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.name
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="email">
								<Form.Label>Email Adress</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="email"
									name="email"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.email
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="phone">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="phone"
									placeholder="Phone Number"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.phone
									}
									disabled={customerStates.isDetailsViewRequested}
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="vatNumber">
								<Form.Label>VAT Identification Number</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="vatNumber"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.vatNumber
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Row>
						<Form.Label as={Col} style={{ fontSize: '44px', margin: 'auto', marginBottom: '10px' }}>
							Delivery Adress
						</Form.Label>
					</Form.Row>

					<Row>
						<Col sm>
							<Form.Group controlId="delivery_country">
								<Form.Label>Delivery Country</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="delivery_country"
									defaultValue={
										customerStates.customer === null
											? null
											: customerStates.customer.delivery_country
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="delivery_city">
								<Form.Label>Delivery City</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="delivery_city"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.delivery_city
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="delivery_street">
								<Form.Label>Delivery Street</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="delivery_street"
									defaultValue={
										customerStates.customer === null
											? null
											: customerStates.customer.delivery_street
									}
									disabled={customerStates.isDetailsViewRequested}
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="delivery_postCode">
								<Form.Label>Delivery PostCode</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="delivery_postCode"
									placeholder="Delivery PostCode"
									defaultValue={
										customerStates.customer === null
											? null
											: customerStates.customer.delivery_postCode
									}
									disabled={customerStates.isDetailsViewRequested}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Row>
						<Form.Label as={Col} style={{ fontSize: '44px', margin: 'auto', marginBottom: '10px' }}>
							Billing Adress
						</Form.Label>
					</Form.Row>

					<Row>
						<Col sm>
							<Form.Group controlId="billing_country">
								<Form.Label>Billing Country</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="billing_country"
									defaultValue={
										customerStates.customer === null
											? null
											: customerStates.customer.billing_country
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="billing_city">
								<Form.Label>Billing City</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="billing_city"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.billing_city
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="billing_street">
								<Form.Label>Billing Street</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="billing_street"
									defaultValue={
										customerStates.customer === null ? null : customerStates.customer.billing_street
									}
									disabled={customerStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="billing_postCode">
								<Form.Label>Billing PostCode</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="billing_postCode"
									placeholder="Billing PostCode"
									defaultValue={
										customerStates.customer === null
											? null
											: customerStates.customer.billing_postCode
									}
									disabled={customerStates.isDetailsViewRequested}
								/>
							</Form.Group>
						</Col>
					</Row>

					{customerOrders.length === 0 ? null : (
						<>
							<Form.Row>
								<Form.Label
									as={Col}
									style={{ fontSize: '44px', margin: 'auto', marginBottom: '10px' }}
								>
									Orders
								</Form.Label>
							</Form.Row>

							<SimpleList
								elementsList={customerOrders}
								titleFieldName="email"
								subtitleFieldName="deadline"
								clickable
								editable
								deletable
							/>
						</>
					)}

					{customerStates.isDetailsViewRequested ? (
						<Row>
							<Col sm>
								<Button onClick={() => props.history.push(`/customers/`)} variant="secondary" block>
									Return
								</Button>
							</Col>

							<Col sm>
								<Button onClick={() => setIsDeleteModalOpen(true)} variant="danger" block>
									Delete
								</Button>
							</Col>

							<Col sm>
								<Button onClick={() => renderEditView()} variant="primary" block>
									Customize Customer
								</Button>
							</Col>
						</Row>
					) : (
						<Row>
							<Col sm>
								<Button onClick={() => props.history.push(`/customers/`)} variant="danger" block>
									Cancel
								</Button>
							</Col>

							<Col sm>
								<Button variant="success" type="submit" block>
									Submit
								</Button>
							</Col>
						</Row>
					)}

					<ConfirmationModal
						isOpen={isDeleteModalOpen}
						onModalClose={() => setIsDeleteModalOpen(false)}
						onConfirm={() => onDeleteConfirm(props.history, props.match.params.id)}
					/>
				</Form>
			</Container>
		)
	}

	return <>{customerStates.isLoaded ? customerCRUDView() : LoadingView()}</>
}
