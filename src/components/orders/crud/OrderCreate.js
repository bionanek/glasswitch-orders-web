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

	const [order, setOrder] = useState({})
	const [customer, setCustomer] = useState([])
	const [availableProducts, setAvailableProducts] = useState([])

	const [selectedProducts, setSelectedProducts] = useState([])
	const [selectedCustomer, setSelectedCustomer] = useState({})
	const [productExistsInOrder, setProductExistsInOrder] = useState(false)

	const [isValidated, setIsValidated] = useState(false)
	const [selectedCurrency, setSelectedCurrency] = useState(false)
	const [isConfirmationSent, setIsConfirmationSent] = useState(false)
	const [isProformaSent, setIsProformaSent] = useState(false)
	const [isInvoiceSent, setIsInvoiceSent] = useState(false)
	const [isPaymentSettled, setIsPaymentSettled] = useState(false)

	function getCurrentProduct(id) {
		return [...availableProducts].find(product => product.id === id)
	}

	// TODO:
	// * ater deleting from selected - move it to availables - that's done but now it has to go back to the same index as it was before being selected
	// * think about how to improve quantity setter as it's a bit heavy

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
				defaultValue={product.quantity}
			/>
		)
	}

	const productsReactiveObjects = productsList => {
		return productsList.map(productElement => {
			const productRO = { ...productElement }
			const currentOrder = order

			currentOrder.wantedProducts = []

			productRO.quantity = 0

			return productRO
		})
	}

	useEffect(() => {
		const fetchedProducts = async () => {
			const prods = await ProductsApiService.getAllProducts()
			setAvailableProducts(productsReactiveObjects(prods.data))

			setIsLoaded(true)
		}
		fetchedProducts()
	}, [])

	const handleProductSearch = async event => {
		const product = event.target.value

		if (product === '') {
			const prods = await ProductsApiService.getAllProducts()
			setAvailableProducts(productsReactiveObjects(prods.data))
			return
		}

		const foundProduct = await ProductsApiService.searchProduct(product)
		setAvailableProducts(productsReactiveObjects(foundProduct.data))
	}

	const setCustomerReactiveObject = customerResults => {
		return customerResults.map(customerElement => {
			const customerRO = { ...customerElement }

			customerRO.clickHandler = () => {
				setCustomer([])
				setSelectedCustomer(customerRO)
			}

			return customerRO
		})
	}

	const handleCustomerSearch = async event => {
		const customerSearch = event.target.value

		if (customerSearch === '') {
			setCustomer([])
			return
		}

		const foundCustomer = await CustomersApiService.searchCustomer(customerSearch)
		setCustomer(setCustomerReactiveObject(foundCustomer.data))
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

	function handleAvailableProductSelection(productId) {
		const allSelected = [...selectedProducts]
		const allAvailable = [...availableProducts]
		const selectedProduct = allAvailable.find(p => p.id === +productId)

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

	const onProductClick = productId => {
		for (let n = 0; n < selectedProducts.length; n += 1) {
			if (selectedProducts[n].id === productId) {
				setProductExistsInOrder(true)
				return
			}
		}

		if (productExistsInOrder === false) {
			handleAvailableProductSelection(productId)
		}
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
			setAvailableProducts(availables) // TODO: add product back to available
		}
	}

	const currencyPicker = () => {
		let title = 'Currency Picker'

		switch (selectedCurrency) {
			case 'pln':
				title = 'PLN'
				break
			case 'usd':
				title = 'USD'
				break
			case 'eur':
				title = 'EUR'
				break
			default:
				title = 'Currency Picker'
		}

		return (
			<div>
				<Form.Label>Currency</Form.Label>
				<DropdownButton title={title} variant="primary">
					<Dropdown.Item onClick={() => setSelectedCurrency('pln')}>PLN</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedCurrency('eur')}>EUR</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedCurrency('usd')}>USD</Dropdown.Item>
				</DropdownButton>
			</div>
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
								<Form.Label>Deadline</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="deadline"
									placeholder="YYYY-MM-DD"
									pattern="[0-9]+([-][0-9]+)([-][0-9]+)?"
									required
								/>
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

					<SimpleList
						elementsList={customer}
						titleFieldName="name"
						subtitleFieldName="email"
						clickable
					/>

					{selectedCustomer.name ? (
						<Row style={{ color: 'white', background: 'purple' }}>
							<DetailElement header="Customer Name:" value={selectedCustomer.name} />
							<DetailElement header="Customer Email:" value={selectedCustomer.email} />
							<DetailElement header="Vat Number:" value={selectedCustomer.vatNumber} />
						</Row>
					) : null}

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

					<SimpleList
						elementsList={selectedProducts}
						titleFieldName="code"
						subtitleFieldName="name"
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
						clickable
						onClick={onProductClick}
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
