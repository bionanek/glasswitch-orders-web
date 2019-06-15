import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
	Container,
	Row,
	Col,
	Form,
	Dropdown,
	DropdownButton,
	Button,
	ButtonGroup,
} from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import CustomersApiService from '../../../utils/api/customersApiService'
import ProductGrid from '../../products/components/grid/ProductGrid'
import ProductsApiService from '../../../utils/api/productsApiService'
import SimpleList from '../../common/simpleList/SimpleList'
import DetailElement from '../../common/DetailElement'
import OrdersApiService from '../../../utils/api/ordersApiService'
import LoadingView from '../../common/LoadingView'
import './OrderCreate.scss'

function OrderCreate(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [order, setOrder] = useState({ wantedProducts: [] })
	const [selectedCustomer, setSelectedCustomer] = useState({})

	const [customers, setAvailableCustomers] = useState([])
	const [availableProducts, setAvailableProducts] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])

	const [date, setDate] = useState(new Date())

	const [selectedCurrency, setSelectedCurrency] = useState('')
	const [isValidated, setIsValidated] = useState(false)
	const [isConfirmationSent, setIsConfirmationSent] = useState(false)
	const [isProformaSent, setIsProformaSent] = useState(false)
	const [isInvoiceSent, setIsInvoiceSent] = useState(false)
	const [isPaymentSettled, setIsPaymentSettled] = useState(false)

	function getCurrentProduct(id) {
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
		selectedProds[targetProduct] = targetProduct
		setSelectedProducts(selectedProds)
	}

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

	const initializeQuantityInProducts = productsList => {
		return productsList.map(productElement => {
			const product = productElement
			product.quantity = 0
			return productElement
		})
	}

	const handleProductSearch = async event => {
		const product = event.target.value

		if (product === '') {
			const fetchedProducts = await ProductsApiService.getAllProducts()
			setAvailableProducts(initializeQuantityInProducts(fetchedProducts.data))
			return
		}

		const foundProduct = await ProductsApiService.searchProduct(product)
		setAvailableProducts(initializeQuantityInProducts(foundProduct.data))
	}

	const handleCustomerSearch = async event => {
		const customerSearch = event.target.value

		if (customerSearch === '') {
			setAvailableCustomers([])
			return
		}

		const foundCustomer = await CustomersApiService.searchCustomer(customerSearch)
		setAvailableCustomers(foundCustomer.data)
	}

	const handleDataConfirm = async () => {
		const currentOrder = order
		setIsValidated(true)

		currentOrder.currency = selectedCurrency
		currentOrder.confirmationSent = isConfirmationSent
		currentOrder.proformaSent = isProformaSent
		currentOrder.invoiceSent = isInvoiceSent
		currentOrder.settledPayment = isPaymentSettled
		currentOrder.customerId = selectedCustomer.id
		currentOrder.deadline = date.toISOString().split('T')[0]

		await OrdersApiService.postOrder(currentOrder)
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

	function handleAvailableProductSelection(product) {
		const allSelected = [...selectedProducts]
		const allAvailable = [...availableProducts]
		const selectedProduct = allAvailable.find(el => el.id === product.id)

		allAvailable.splice(allAvailable.indexOf(selectedProduct), 1)
		setAvailableProducts(allAvailable)

		const currentOrder = { ...order }
		currentOrder.wantedProducts.push({
			id: selectedProduct.id,
			quantity: selectedProduct.quantity,
		})

		allSelected.push(selectedProduct)
		setSelectedProducts(allSelected)

		setOrder(currentOrder)
	}

	const onAvailableCustomerClick = customer => {
		setAvailableCustomers([])
		setSelectedCustomer(customer)
	}

	const onAvailableProductClick = product => {
		if (selectedProducts[product]) {
			return
		}

		handleAvailableProductSelection(product)
	}

	const onSelectedProductDelete = product => {
		const indexOfProduct = selectedProducts.indexOf(product)
		if (indexOfProduct >= 0) {
			const selectedProds = [...selectedProducts]
			const availables = [...availableProducts]
			const currentOrder = { ...order }
			selectedProds.splice(indexOfProduct, 1)
			currentOrder.wantedProducts.splice(indexOfProduct, 1)
			setSelectedProducts(selectedProds)
			availables.push(product)
			setAvailableProducts(availables)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedProducts = await ProductsApiService.getAllProducts()
			setAvailableProducts(initializeQuantityInProducts(fetchedProducts.data))
			setIsLoaded(true)
		}
		fetchData()
	}, [])

	const currencyPicker = () => {
		return (
			<>
				<Form.Label>Currency</Form.Label>
				<DropdownButton
					title={selectedCurrency.toUpperCase() || 'Currency Picker'}
					variant="primary"
				>
					<Dropdown.Item onClick={() => setSelectedCurrency('pln')}>PLN</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedCurrency('eur')}>EUR</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedCurrency('usd')}>USD</Dropdown.Item>
				</DropdownButton>
			</>
		)
	}

	const orderCreateView = () => {
		return (
			<Container className="order-create">
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Row>
						<Col sm>{currencyPicker()}</Col>

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
								<Form.Label>Invoice Sent??</Form.Label>
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
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="shippingCompany">
								<Form.Label>Shipping Company</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="shippingCompany"
									placeholder="Shipping Company"
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
									placeholder="Shipping Cost"
									pattern="[0-9]+([,\.][0-9]+)?"
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="email"
									placeholder="Email"
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="deadline">
								<Row>
									<Form.Label>Deadline</Form.Label>
								</Row>

								<Row>
									<DatePicker
										onChange={date => setDate(date)}
										className="date-picker"
										name="deadline"
										format="y-M-dd"
										value={date}
									/>
								</Row>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="notes">
								<Form.Label>Notes</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="notes"
									placeholder="Notes"
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="customer">
								<Form.Label>Customer Search</Form.Label>
								<Form.Control
									onChange={handleCustomerSearch}
									type="text"
									name="customerSearch"
									placeholder="John Doe"
								/>
							</Form.Group>
						</Col>
					</Row>

					{selectedCustomer.name ? (
						<Row style={{ color: 'white', background: 'purple' }}>
							<DetailElement header="Customer Name:" value={selectedCustomer.name} />
							<DetailElement header="Customer Email:" value={selectedCustomer.email} />
							<DetailElement header="Vat Number:" value={selectedCustomer.vatNumber} />
						</Row>
					) : null}

					{customers.length !== 0 && (
						<SimpleList
							elementsList={customers}
							titleFieldName="name"
							subtitleFieldName="email"
							onClick={onAvailableCustomerClick}
							clickable
						/>
					)}

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

					{selectedProducts.length !== 0 && (
						<SimpleList
							elementsList={selectedProducts}
							titleFieldName="code"
							subtitleFieldName="name"
							dynamicElement={quantityInput}
							onDelete={onSelectedProductDelete}
							deletable
						/>
					)}

					<ProductGrid
						productsList={availableProducts}
						imageSource="imageUrl"
						name="name"
						code="code"
						pln="pln"
						eur="eur"
						usd="usd"
						dynamicElement={quantityInput}
						clickable
						onClick={onAvailableProductClick}
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

	return <> {isLoaded ? orderCreateView() : LoadingView()} </>
}

export default withRouter(OrderCreate)
