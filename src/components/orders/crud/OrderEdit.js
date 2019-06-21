/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
	Container,
	Form,
	Row,
	Col,
	Button,
	ButtonGroup,
	InputGroup,
	Dropdown,
	DropdownButton,
} from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import LoadingView from '../../common/LoadingView'
import OrdersApiService from '../../../utils/api/ordersApiService'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductGrid from '../../products/components/grid/ProductGrid'
import './OrderEdit.scss'

function OrderEdit(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [order, setOrder] = useState({})

	const [selectedProducts, setSelectedProducts] = useState([])
	const [availableProducts, setAvailableProducts] = useState([])

	const [date, setDate] = useState(new Date())

	const [selectedCurrency, setSelectedCurrency] = useState('')

	const [isValidated, setIsValidated] = useState(false)
	const [isConfirmationSent, setIsConfirmationSent] = useState(false)
	const [isProformaSent, setIsProformaSent] = useState(false)
	const [isInvoiceSent, setIsInvoiceSent] = useState(false)
	const [isPaymentSettled, setIsPaymentSettled] = useState(false)

	const getCurrentProduct = id => {
		return [...availableProducts].find(product => product.id === id)
	}

	const quantitySetter = event => {
		let targetProduct = [...selectedProducts].find(product => product.id === +event.target.id)
		let isAvailable = false

		if (!targetProduct) {
			targetProduct = getCurrentProduct(+event.target.id)
			isAvailable = true
		}
		targetProduct.quantity = +event.target.value

		if (isAvailable) {
			const allProducts = [...availableProducts]
			allProducts[targetProduct] = targetProduct
			setAvailableProducts(allProducts)
			return
		}

		const selectedProds = [...selectedProducts]
		selectedProds[selectedProds.indexOf(targetProduct)] = targetProduct
		setSelectedProducts(selectedProds)
	}

	const handleAvailableProductSelection = product => {
		const allSelected = [...selectedProducts]
		const allAvailable = [...availableProducts]
		const selectedProduct = allAvailable.find(el => el.id === product.id)

		allAvailable.splice(allAvailable.indexOf(selectedProduct), 1)
		setAvailableProducts(allAvailable)

		const currentOrder = { ...order }
		currentOrder.products.push({
			id: selectedProduct.id,
			quantity: selectedProduct.quantity,
		})

		allSelected.push(selectedProduct)
		setSelectedProducts(allSelected)

		setOrder(currentOrder)
	}

	const onAvailableProductClick = product => {
		if (selectedProducts[product]) {
			return
		}
		handleAvailableProductSelection(product)
	}

	const initializeQuantityInProducts = productsList => {
		return productsList.map(productElement => {
			const product = productElement

			if (product.products_orders === undefined) {
				product.quantity = 0
			} else {
				product.quantity = product.products_orders.quantity
			}

			return productElement
		})
	}

	const onSelectedProductDelete = async product => {
		const indexOfProduct = selectedProducts.indexOf(product)

		if (indexOfProduct >= 0) {
			const selectedProds = [...selectedProducts]
			const availables = [...availableProducts]
			const currentOrder = { ...order }
			const prod = { ...product }
			prod.quantity = 0

			selectedProds.splice(indexOfProduct, 1)
			currentOrder.products.splice(indexOfProduct, 1)
			setSelectedProducts(selectedProds)

			const fetchedProduct = await ProductsApiService.getProductById(prod.id)
			availables.push(fetchedProduct.data)

			setAvailableProducts(availables)
		}
	}

	const handleFormChange = event => {
		const currentOrder = order
		const { id, name, value } = event.target

		switch (id) {
			default:
				currentOrder[name] = value
				break
		}

		setOrder(currentOrder)
	}

	const handleDataConfirm = async () => {
		const currentOrder = order
		setIsValidated(true)

		currentOrder.currency = selectedCurrency
		currentOrder.confirmationSent = isConfirmationSent
		currentOrder.proformaSent = isProformaSent
		currentOrder.invoiceSent = isInvoiceSent
		currentOrder.settledPayment = isPaymentSettled
		currentOrder.deadline = date.toLocaleDateString()
		currentOrder.currency = selectedCurrency
		currentOrder.products = selectedProducts.map(prod => {
			return {
				id: prod.id,
				quantity: prod.quantity,
			}
		})
		// console.log("TCL: handleDataConfirm -> currentOrder", currentOrder)

		await OrdersApiService.updateProduct(props.match.params.id)
		props.history.push('/orders')
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		event.preventDefault()

		if (form.checkValidity() === false) {
			event.stopPropagation()
		}
		handleDataConfirm()
	}

	const removeSelectedProductsFromAvailable = (productsInOrder, remainingProducts) => {
		const allSelected = [...productsInOrder]
		let allAvailable = [...remainingProducts]

		for (const product of allSelected) {
			allAvailable = allAvailable.filter(prod => {
				return prod.id !== product.id
			})
		}

		setAvailableProducts(allAvailable)
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)
			
			setOrder(fetchedOrder.data)
			setSelectedProducts(initializeQuantityInProducts(fetchedOrder.data.products))
			setSelectedCurrency(fetchedOrder.data.currency)
			setIsConfirmationSent(fetchedOrder.data.confirmationSent)
			setIsPaymentSettled(fetchedOrder.data.settledPayment)
			setIsInvoiceSent(fetchedOrder.data.invoiceSent)
			setIsProformaSent(fetchedOrder.data.proformaSent)
			
			const deadline = fetchedOrder.data.deadline.split('/')
			setDate(new Date(deadline[2], deadline[1] - 1, deadline[0]))

			const fetchedAvailableProducts = await ProductsApiService.getAllProducts()

			await removeSelectedProductsFromAvailable(
				fetchedOrder.data.products,
				fetchedAvailableProducts.data,
			)

			setIsLoaded(true)
		}
		fetchData()
	}, [])

	const quantityInput = (productId, _product = null) => {
		let product = _product
		if (product === null) {
			product = getCurrentProduct(productId)
		}

		return (
			<input
				onBlur={quantitySetter}
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

	const orderEditView = () => {
		return (
			<Container className="order-edit">
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Row>
						<Col sm>
							<Form.Group>
								<Form.Label>Confirmation Sent?</Form.Label>
								<ButtonGroup style={{ width: '100%' }}>
									<Button
										onClick={() => setIsConfirmationSent(true)}
										style={{ border: isConfirmationSent ? '4px solid' : null }}
										variant={isConfirmationSent ? 'success' : 'secondary'}
									>
										Yes
									</Button>

									<Button
										onClick={() => setIsConfirmationSent(false)}
										style={{ border: isConfirmationSent ? null : '4px solid' }}
										variant={isConfirmationSent ? 'secondary' : 'success'}
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
										onClick={() => setIsProformaSent(true)}
										style={{ border: isProformaSent ? '4px solid' : null }}
										variant={isProformaSent ? 'success' : 'secondary'}
									>
										Yes
									</Button>

									<Button
										onClick={() => setIsProformaSent(false)}
										style={{ border: isProformaSent ? null : '4px solid' }}
										variant={isProformaSent ? 'secondary' : 'success'}
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
										onClick={() => setIsInvoiceSent(true)}
										style={{ border: isInvoiceSent ? '4px solid' : null }}
										variant={isInvoiceSent ? 'success' : 'secondary'}
									>
										Yes
									</Button>

									<Button
										onClick={() => setIsInvoiceSent(false)}
										style={{ border: isInvoiceSent ? null : '4px solid' }}
										variant={isInvoiceSent ? 'secondary' : 'success'}
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
										onClick={() => setIsPaymentSettled(true)}
										style={{ border: isPaymentSettled ? '4px solid' : null }}
										variant={isPaymentSettled ? 'success' : 'secondary'}
									>
										Yes
									</Button>

									<Button
										onClick={() => setIsPaymentSettled(false)}
										style={{ border: isPaymentSettled ? null : '4px solid' }}
										variant={isPaymentSettled ? 'secondary' : 'success'}
									>
										No
									</Button>
								</ButtonGroup>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="deadline">
								<Form.Label>Deadline</Form.Label>
								<DatePicker
									onChange={date => setDate(date)}
									className="date-picker"
									name="deadline"
									format="dd-M-y"
									minDate={new Date()}
									value={date}
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
									type="text"
									name="shippingCompany"
									defaultValue={order.shippingCompany}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="shippingCost">
								<Form.Label>Shipping Cost</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="shippingCost"
									defaultValue={order.shippingCost}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="notes">
								<Form.Label>Notes</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="notes"
									defaultValue={order.notes}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="orderEmail">
								<Form.Label>Order Email</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="orderEmail"
									defaultValue={order.email}
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
									defaultValue={order.customer.name}
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
									defaultValue={order.customer.email}
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
									defaultValue={order.customer.vatNumber}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>

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
										<Dropdown.Item onClick={() => setSelectedCurrency('pln')}>PLN</Dropdown.Item>
										<Dropdown.Item onClick={() => setSelectedCurrency('eur')}>EUR</Dropdown.Item>
										<Dropdown.Item onClick={() => setSelectedCurrency('usd')}>USD</Dropdown.Item>
									</DropdownButton>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="productsTotalPrice"
										defaultValue={order.productsTotalPrice}
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
									defaultValue={order.productsCount}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>

					<SimpleList
						elementsList={selectedProducts}
						titleFieldName="name"
						subtitleFieldName="code"
						dynamicElement={quantityInput}
						onDelete={onSelectedProductDelete}
						deletable
					/>

					<ProductGrid
						productsList={availableProducts}
						imageSource="imageUrl"
						name="name"
						code="code"
						pln="pln"
						eur="eur"
						usd="usd"
						dynamicElement={quantityInput}
						onClick={onAvailableProductClick}
						clickable
					/>

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

	return <> {isLoaded ? orderEditView() : LoadingView()} </>
}

export default withRouter(OrderEdit)
