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
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import { OrderReducers, InitialOrderState } from './OrderReducers'

const OrderCRUD = props => {
	const [orderStates, orderDispatch] = useReducer(OrderReducers, InitialOrderState)

	const handleCustomerSearch = async event => {
		const customerSearch = event.target.value

		if (customerSearch === '') {
			orderDispatch({ type: 'CUSTOMER_SEARCH_EMPTY' })
			return
		}

		const foundCustomers = await CustomersApiService.searchCustomer(customerSearch)
		orderDispatch({ type: 'CUSTOMER_SEARCH_RESULTS', foundCustomers: foundCustomers.data })
	}

	const handleProductSearch = async event => {
		const productSearch = event.target.value

		if (productSearch === '') {
			const fetchedProducts = await ProductsApiService.getAllProducts()
			orderDispatch({ type: 'PRODUCT_SEARCH_EMPTY', availableProducts: fetchedProducts.data })
			return
		}

		const foundProducts = await ProductsApiService.searchProduct(productSearch)
		orderDispatch({ type: 'PRODUCTS_SEARCH_RESULTS', foundProducts: foundProducts.data })
	}

	const handleFormChange = () => {}

	const handleSubmit = () => {}

	useEffect(() => {
		const renderRequestedPage = async () => {
			if (props.match.params.id === undefined) {
				const fetchedAvailableProducts = await ProductsApiService.getAllProducts()

				orderDispatch({
					type: 'ORDER_CREATE_INIT',
					products: fetchedAvailableProducts.data,
				})
				return
			}

			if (props.match.path.split(':id/')[1] === 'details') {
				const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)
				const fetchedAvailableProducts = await ProductsApiService.getAllProducts()

				orderDispatch({
					type: 'ORDER_DATA_INIT',
					order: fetchedOrder.data,
					products: fetchedAvailableProducts.data,
					isDetailsViewRequested: true,
				})
			} else {
				const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)
				const fetchedAvailableProducts = await ProductsApiService.getAllProducts()

				orderDispatch({
					type: 'ORDER_DATA_INIT',
					order: fetchedOrder.data,
					products: fetchedAvailableProducts.data,
					isDetailsViewRequested: false,
				})
			}
		}
		renderRequestedPage()
	}, [])

	const getCurrentProduct = id => {
		return [...orderStates.availableProducts].find(product => product.id === id)
	}

	const quantityInput = (productId, _product = null) => {
		let product = _product
		if (product === null) {
			product = getCurrentProduct(productId)
		}

		return (
			<input
				// onBlur={quantitySetter}
				onFocus={event => event.target.select()}
				style={{ width: '100%' }}
				type="number"
				name="quantity"
				id={productId}
				placeholder="Quantity"
				defaultValue={product.quantity === 0 ? null : product.quantity}
			/>
		)
	}

	const orderCRUDForm = () => {
		return (
			<Container className="order-edit">
				<Form onSubmit={handleSubmit} validated={orderStates.isValidated}>
					<Row>
						<Col sm>
							<Button
								style={{ width: '100%', border: '2px solid' }}
								variant="warning"
								onClick={() => console.log('TCL: orderStates', orderStates)}
							>
								CONSOLE.LOG -- orderStates -- CONSOLE.LOG
							</Button>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group>
								<Form.Label>Confirmation Sent?</Form.Label>
								<ButtonGroup style={{ width: '100%' }}>
									<Button
										onClick={() =>
											orderDispatch({ type: 'CONFIRMATION_SENT_STATUS', status: true })
										}
										style={{ border: orderStates.isConfirmationSent ? '4px solid' : null }}
										variant={orderStates.isConfirmationSent ? 'success' : 'secondary'}
										disabled={orderStates.isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() =>
											orderDispatch({ type: 'CONFIRMATION_SENT_STATUS', status: false })
										}
										style={{ border: orderStates.isConfirmationSent ? null : '4px solid' }}
										variant={orderStates.isConfirmationSent ? 'secondary' : 'success'}
										disabled={orderStates.isDetailsViewRequested}
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
										onClick={() => orderDispatch({ type: 'PROFORMA_SENT_STATUS', status: true })}
										style={{ border: orderStates.isProformaSent ? '4px solid' : null }}
										variant={orderStates.isProformaSent ? 'success' : 'secondary'}
										disabled={orderStates.isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'PROFORMA_SENT_STATUS', status: false })}
										style={{ border: orderStates.isProformaSent ? null : '4px solid' }}
										variant={orderStates.isProformaSent ? 'secondary' : 'success'}
										disabled={orderStates.isDetailsViewRequested}
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
										onClick={() => orderDispatch({ type: 'INVOICE_SENT_STATUS', status: true })}
										style={{ border: orderStates.isInvoiceSent ? '4px solid' : null }}
										variant={orderStates.isInvoiceSent ? 'success' : 'secondary'}
										disabled={orderStates.isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'INVOICE_SENT_STATUS', status: false })}
										style={{ border: orderStates.isInvoiceSent ? null : '4px solid' }}
										variant={orderStates.isInvoiceSent ? 'secondary' : 'success'}
										disabled={orderStates.isDetailsViewRequested}
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
										onClick={() => orderDispatch({ type: 'SETTLED_PAYMENT_STATUS', status: true })}
										style={{ border: orderStates.isPaymentSettled ? '4px solid' : null }}
										variant={orderStates.isPaymentSettled ? 'success' : 'secondary'}
										disabled={orderStates.isDetailsViewRequested}
									>
										Yes
									</Button>

									<Button
										onClick={() => orderDispatch({ type: 'SETTLED_PAYMENT_STATUS', status: false })}
										style={{ border: orderStates.isPaymentSettled ? null : '4px solid' }}
										variant={orderStates.isPaymentSettled ? 'secondary' : 'success'}
										disabled={orderStates.isDetailsViewRequested}
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
									value={orderStates.date}
									disabled={orderStates.isDetailsViewRequested}
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
									defaultValue={
										orderStates.order === null ? null : orderStates.order.shippingCompany
									}
									disabled={orderStates.isDetailsViewRequested}
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
									defaultValue={orderStates.order === null ? null : orderStates.order.shippingCost}
									disabled={orderStates.isDetailsViewRequested}
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
									defaultValue={orderStates.order === null ? null : orderStates.order.notes}
									disabled={orderStates.isDetailsViewRequested}
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
									defaultValue={orderStates.order === null ? null : orderStates.order.notes}
									disabled={orderStates.isDetailsViewRequested}
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
									defaultValue={
										orderStates.selectedCustomer === null ? null : orderStates.selectedCustomer.name
									}
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
									defaultValue={
										orderStates.selectedCustomer === null
											? null
											: orderStates.selectedCustomer.email
									}
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
									defaultValue={
										orderStates.selectedCustomer === null
											? null
											: orderStates.selectedCustomer.vatNumber
									}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>

					{orderStates.isDetailsViewRequested ? null : (
						<Row>
							<Col sm>
								<Form.Group controlId="customerSearch">
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

					{orderStates.isDetailsViewRequested
						? null
						: orderStates.availableCustomers.length !== 0 && (
								<SimpleList
									elementsList={orderStates.availableCustomers}
									titleFieldName="name"
									subtitleFieldName="email"
									onClick={customer => orderDispatch({ type: 'CUSTOMER_SET', customer })}
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
										title={
											orderStates.selectedCurrency.toUpperCase() ||
											orderStates.order.currency.toUpperCase()
										}
										variant="primary"
										disabled={orderStates.isDetailsViewRequested}
									>
										<Dropdown.Item
											onClick={() => orderDispatch({ type: 'CURRENCY_PICKER', currency: 'pln' })}
										>
											PLN
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => orderDispatch({ type: 'CURRENCY_PICKER', currency: 'eur' })}
										>
											EUR
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => orderDispatch({ type: 'CURRENCY_PICKER', currency: 'usd' })}
										>
											USD
										</Dropdown.Item>
									</DropdownButton>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="productsTotalPrice"
										placeholder="Products Total Price"
										defaultValue={
											orderStates.order === null ? null : orderStates.order.productsTotalPrice
										}
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
									defaultValue={orderStates.order === null ? null : orderStates.order.productsCount}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>

					{orderStates.selectedProducts.length === 0 ? null : (
						<SimpleList
							elementsList={orderStates.selectedProducts}
							titleFieldName="name"
							subtitleFieldName="code"
							dynamicElement={quantityInput}
							// onDelete={onSelectedProductDelete}
							// deletable
						/>
					)}

					{orderStates.isDetailsViewRequested ? null : (
						<Row>
							<Col sm>
								<Form.Group controlId="product">
									<Form.Label>Product Search</Form.Label>
									<Form.Control
										onChange={handleProductSearch}
										type="text"
										name="productSearch"
										placeholder="GW-997"
									/>
								</Form.Group>
							</Col>
						</Row>
					)}

					{orderStates.isDetailsViewRequested ? null : (
						<ProductGrid
							productsList={orderStates.availableProducts}
							imageSource="imageUrl"
							name="name"
							code="code"
							pln="pln"
							eur="eur"
							usd="usd"
							dynamicElement={quantityInput}
							onClick={product => orderDispatch({ type: 'ADD_PRODUCT', product })}
							clickable
						/>
					)}

					{orderStates.isDetailsViewRequested ? (
						<Row>
							<Col sm>
								<Button
									style={{ width: '100%', border: '2px solid' }}
									variant="secondary"
									onClick={() => props.history.push('/orders/')}
								>
									Return
								</Button>
							</Col>

							<Col sm>
								<Button
									style={{ width: '100%', border: '2px solid' }}
									variant="danger"
									onClick={() => orderDispatch({ type: 'OPEN_DELETE_MODAL' })}
								>
									Delete
								</Button>
							</Col>

							<Col sm>
								<Button
									style={{ width: '100%', border: '2px solid' }}
									type="submit"
									variant="success"
								>
									Submit
								</Button>
							</Col>
						</Row>
					) : (
						<Row>
							<Col sm>
								<Button
									style={{ width: '100%', border: '2px solid' }}
									variant="danger"
									onClick={() => props.history.push(`/orders/`)}
								>
									Cancel
								</Button>
							</Col>

							<Col sm>
								<Button
									style={{ width: '100%', border: '2px solid' }}
									type="submit"
									variant="success"
								>
									Submit
								</Button>
							</Col>
						</Row>
					)}

					<ConfirmationModal
						isOpen={orderStates.isDeleteModalOpen}
						onModalClose={() => orderDispatch({ type: 'CLOSE_DELETE_MODAL' })}
						onConfirm={() =>
							orderDispatch({
								type: 'HANDLE_ORDER_DELETE',
								url: props.history,
								id: props.match.params.id,
							})
						}
					/>
				</Form>
			</Container>
		)
	}
	return <> {orderStates.isLoaded ? orderCRUDForm() : LoadingView()} </>
}

export default withRouter(OrderCRUD)
