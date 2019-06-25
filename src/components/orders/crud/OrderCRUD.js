import React, { useEffect, useReducer } from 'react'
import { withRouter } from 'react-router-dom'
import {
	Container,
	Col,
	Row,
	Button,
	ButtonGroup,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
} from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import LoadingView from '../../common/LoadingView'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductGrid from '../../products/components/grid/ProductGrid'
import OrdersApiService from '../../../utils/api/ordersApiService'
import CustomersApiService from '../../../utils/api/customersApiService'
import ProductsApiService from '../../../utils/api/productsApiService'
import { OrderReducers, InitialOrderState } from './OrderReducers'

const OrderCRUD = props => {
	const [orderStates, orderDispatch] = useReducer(OrderReducers, InitialOrderState)

	const {
		isLoaded,
		isConfirmationSent,
		isProformaSent,
		isInvoiceSent,
		isPaymentSettled,
		isValidated,
		isDetailsViewRequested,
		order,
		date,
		selectedCurrency,
		availableProducts,
		availableCustomers,
		selectedProducts,
		selectedCustomer,
	} = orderStates

	const handleCustomerSearch = event => {
		orderDispatch({ type: 'CUSTOMER_SEARCH', event })
	}

	const handleFormChange = () => {}

	const handleSubmit = () => {}

	useEffect(() => {
		const renderRequestedPage = async () => {
			if (props.match.params.id === undefined) {
				const fetchedAvailableCustomers = await CustomersApiService.getAllCustomers()
				const fetchedAvailableProducts = await ProductsApiService.getAllProducts()

				orderDispatch({
					type: 'ORDER_CREATE_INITIAL',
					customers: fetchedAvailableCustomers.data,
					products: fetchedAvailableProducts.data,
				})
				return
			}

			if (props.match.path.split(':id/')[1] === 'details') {
				const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)

				orderDispatch({
					type: 'ORDER_DATA_INIT',
					order: fetchedOrder.data,
					isDetailsViewRequested: true,
				})
			} else {
				const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)
				const fetchedAvailableCustomers = await CustomersApiService.getAllCustomers()
				const fetchedAvailableProducts = await ProductsApiService.getAllProducts()

				orderDispatch({
					type: 'ORDER_DATA_INIT',
					order: fetchedOrder.data,
					customers: fetchedAvailableCustomers.data,
					products: fetchedAvailableProducts.data,
					isDetailsViewRequested: false,
				})
			}
		}
		renderRequestedPage()
	}, [])

	const orderCRUDForm = () => {
		return (
			<Container className="order-edit">
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Row>
						<Col sm>
							<Form.Group>
								<Form.Label>Confirmation Sent?</Form.Label>
								<ButtonGroup style={{ width: '100%' }}>
									<Button
										onClick={() => orderDispatch({ type: 'CONFIRMATION_SENT' })}
										style={{ border: isConfirmationSent ? '4px solid' : null }}
										variant={isConfirmationSent ? 'success' : 'secondary'}
										disabled={isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'CONFIRMATION_NOT_SENT' })}
										style={{ border: isConfirmationSent ? null : '4px solid' }}
										variant={isConfirmationSent ? 'secondary' : 'success'}
										disabled={isDetailsViewRequested}
									>
										No
									</Button>
								</ButtonGroup>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group>
								<Form.Label>Proforma Sent?</Form.Label>
								<ButtonGroup style={{ width: '100%' }}>
									<Button
										onClick={() => orderDispatch({ type: 'PROFORMA_SENT' })}
										style={{ border: isProformaSent ? '4px solid' : null }}
										variant={isProformaSent ? 'success' : 'secondary'}
										disabled={isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'PROFORMA_NOT_SENT' })}
										style={{ border: isProformaSent ? null : '4px solid' }}
										variant={isProformaSent ? 'secondary' : 'success'}
										disabled={isDetailsViewRequested}
									>
										No
									</Button>
								</ButtonGroup>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group>
								<Form.Label>Invoice Sent?</Form.Label>
								<ButtonGroup style={{ width: '100%' }}>
									<Button
										onClick={() => orderDispatch({ type: 'INVOICE_SENT' })}
										style={{ border: isInvoiceSent ? '4px solid' : null }}
										variant={isInvoiceSent ? 'success' : 'secondary'}
										disabled={isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'INVOICE_NOT_SENT' })}
										style={{ border: isInvoiceSent ? null : '4px solid' }}
										variant={isInvoiceSent ? 'secondary' : 'success'}
										disabled={isDetailsViewRequested}
									>
										No
									</Button>
								</ButtonGroup>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group>
								<Form.Label>Settled Payment?</Form.Label>
								<ButtonGroup style={{ width: '100%' }}>
									<Button
										onClick={() => orderDispatch({ type: 'PAYMENT_SETTLED' })}
										style={{ border: isPaymentSettled ? '4px solid' : null }}
										variant={isPaymentSettled ? 'success' : 'secondary'}
										disabled={isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'PAYMENT_NOT_SETTLED' })}
										style={{ border: isPaymentSettled ? null : '4px solid' }}
										variant={isPaymentSettled ? 'secondary' : 'success'}
										disabled={isDetailsViewRequested}
									>
										No
									</Button>
								</ButtonGroup>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="deadline">
								<Form.Label>Deadline (DD-MM-YYYY)</Form.Label>
								<DatePicker
									onChange={deadline => orderDispatch({ type: 'DEADLINE_SET', deadline })}
									className="date-picker"
									name="deadline"
									format="dd-M-y"
									minDate={new Date()}
									value={date}
									disabled={isDetailsViewRequested}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="shippingCompany">
								<Form.Label>Shipping Company</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="shippingCompany"
									placeholder="Shipping Company"
									// defaultValue={order.shippingCompany && 'Shipping Company'}
									disabled={isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="shippingCost">
								<Form.Label>Shipping Cost</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="shippingCost"
									placeholder="Shipping Cost"
									// defaultValue={order.shippingCost}
									disabled={isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="notes">
								<Form.Label>Notes</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="notes"
									placeholder="Notes"
									// defaultValue={order.notes}
									disabled={isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="orderEmail">
								<Form.Label>Order Email</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									onFocus={event => event.target.select()}
									type="text"
									name="orderEmail"
									placeholder="Order Email"
									// defaultValue={order.email}
									disabled={isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="customerName">
								<Form.Label>Customer Name</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="customerName"
									placeholder="Customer Name"
									defaultValue={selectedCustomer.name}
									disabled
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="customerEmail">
								<Form.Label>Customer Email</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="customerEmail"
									placeholder="Customer Email"
									defaultValue={selectedCustomer.email}
									disabled
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="customerVat">
								<Form.Label>Customer VAT Number</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="customerVat"
									placeholder="Customer VAT Number"
									defaultValue={selectedCustomer.vatNumber}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>

					{isDetailsViewRequested ? null : (
						<Row>
							<Col sm>
								<Form.Group controlId="customer">
									<Form.Label>Customer Search</Form.Label>
									<Form.Control
										onChange={handleCustomerSearch}
										onFocus={event => event.target.select()}
										type="text"
										name="customerSearch"
										placeholder="John Doe"
									/>
								</Form.Group>
							</Col>
						</Row>
					)}

					{isDetailsViewRequested
						? null
						: availableCustomers.length !== 0 && (
								<SimpleList
									elementsList={availableCustomers}
									titleFieldName="name"
									subtitleFieldName="email"
									// onClick={onAvailableCustomerClick}
									clickable
								/>
						  )}

					<Row>
						<Col sm>
							<Form.Group controlId="productsTotalPrice">
								<Form.Label>Total Price</Form.Label>
								<InputGroup>
									<DropdownButton
										as={InputGroup.Prepend}
										title={selectedCurrency.toUpperCase() || order.currency.toUpperCase()}
										variant="primary"
									>
										<Dropdown.Item onClick={() => orderDispatch({ type: 'pln' })}>
											PLN
										</Dropdown.Item>
										<Dropdown.Item onClick={() => orderDispatch({ type: 'eur' })}>
											EUR
										</Dropdown.Item>
										<Dropdown.Item onClick={() => orderDispatch({ type: 'usd' })}>
											USD
										</Dropdown.Item>
									</DropdownButton>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="productsTotalPrice"
										placeholder="Products Total Price"
										// defaultValue={order.productsTotalPrice}
										disabled
									/>
								</InputGroup>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productsCount">
								<Form.Label>Products Count</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="number"
									name="productsCount"
									placeholder="Products Count"
									// defaultValue={order.productsCount}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>

					<SimpleList
						elementsList={selectedProducts}
						titleFieldName="name"
						subtitleFieldName="code"
						// dynamicElement={quantityInput}
						// onDelete={onSelectedProductDelete}
						// deletable
					/>

					{isDetailsViewRequested ? null : (
						<ProductGrid
							productsList={availableProducts}
							imageSource="imageUrl"
							name="name"
							code="code"
							pln="pln"
							eur="eur"
							usd="usd"
							// dynamicElement={quantityInput}
							// onClick={onAvailableProductClick}
							clickable
						/>
					)}

					<Row>
						<Col sm>
							<Button
								style={{ width: '100%', border: '2px solid' }}
								type="submit"
								variant="success"
							>
								Submit
							</Button>
						</Col>
						<Col sm>
							<Button
								style={{ width: '100%', border: '2px solid' }}
								variant="danger"
								onClick={() => props.history.push('/orders/')}
							>
								Cancel
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		)
	}
	return <> {isLoaded ? orderCRUDForm() : LoadingView()} </>
}

export default withRouter(OrderCRUD)
