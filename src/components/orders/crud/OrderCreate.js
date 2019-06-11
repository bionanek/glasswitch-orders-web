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
	const [products, setProducts] = useState([])

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
		return [...products].find(product => product.id === id)
	}

	// TODO:
	// * after adding product to selected - remove it from availables
	// * ater deleting from selected - move it to availables
	// * when you click on quantity textbox - highlight all text

	const quantitySetter = event => {
		// this must go, quantity should be set only on click
		const allProducts = [...products]
		const targetProduct = getCurrentProduct(+event.target.id)
		targetProduct.quantity = event.target.value

		setProducts(allProducts)
	}

	const quantityInput = productId => {
		const product = getCurrentProduct(productId)
		return (
			<input
				onChange={quantitySetter}
				style={{ width: '100%' }}
				type="number"
				name="quantity"
				id={productId}
				placeholder="Quantity"
				defaultValue={product.quantity}
			/>
		)
	}

	// const selectedProductsReactiveObjects = productsList => {
	// 	return productsList.map(productElement => {
	// 		const productRO = { ...productElement }
	// 		const currentOrder = order

	// 		productRO.deleteHandler = () => {
	// 			for (let n = 0; n < selectedProducts.length; n++) {
	// 				if (selectedProducts[n].id === productRO.id) {
	// 					selectedProducts.splice(n, 1)
	// 					currentOrder.wantedProducts.splice(n, 1)
	// 					setSelectedProducts(selectedProducts)
	// 					return
	// 				}
	// 			}
	// 		}

	// 		return productRO
	// 	})
	// }

	const productsReactiveObjects = productsList => {
		return productsList.map(productElement => {
			const productRO = { ...productElement }
			const currentOrder = order

			currentOrder.wantedProducts = []

			productRO.quantity = 0
			productRO.deleteHandler = () => {
				for (let n = 0; n < selectedProducts.length; n++) {
					if (selectedProducts[n].id === productRO.id) {
						const selectedProds = [...selectedProducts]
						selectedProds.splice(n, 1)
						currentOrder.wantedProducts.splice(n, 1)
						setSelectedProducts(selectedProds)
						return
					}
				}
			}
			productRO.clickHandler = () => {
				// for (let n = 0; n < selectedProducts.length; n++) {
				// 	if (selectedProducts[n].id === productRO.id) {
				// 		setProductExistsInOrder(true)
				// 		return
				// 	}
				// }
				// if (productExistsInOrder === false) {
				// 	const selectedProduct = {
				// 		id: productRO.id,
				// 		quantity: productRO.quantity,
				// 	}
				// 	currentOrder.wantedProducts.push(selectedProduct)
				// 	console.log('Before: ')
				// 	console.log(selectedProducts)
				// 	selected.push(productRO)
				// 	console.log('After: ')
				// 	console.log(selectedProducts)
				// 	// setSelectedProducts(selectedProductsReactiveObjects(selectedProducts))
				// 	setOrder(currentOrder)
				// }
			}

			return productRO
		})
	}

	useEffect(() => {
		const fetchedProducts = async () => {
			const prods = await ProductsApiService.getAllProducts()
			setProducts(productsReactiveObjects(prods.data))

			setIsLoaded(true)
		}
		fetchedProducts()
	}, [])

	const handleProductSearch = async event => {
		const product = event.target.value

		if (product === '') {
			const prods = await ProductsApiService.getAllProducts()
			setProducts(productsReactiveObjects(prods.data))
			return
		}

		const foundProduct = await ProductsApiService.searchProduct(product)
		setProducts(productsReactiveObjects(foundProduct.data))
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

	const onProductClick = productId => {
		const allProducts = [...products]
		const product = allProducts.find(p => p.id === +productId)
		const allSelected = [...selectedProducts]

		for (let n = 0; n < selectedProducts.length; n += 1) {
			if (allSelected[n].id === product.id) {
				setProductExistsInOrder(true)
				return
			}
		}

		if (productExistsInOrder === false) {
			const selectedProduct = {
				id: product.id,
				quantity: product.quantity,
			}

			const currentOrder = order
			currentOrder.wantedProducts.push(selectedProduct)
			console.log('Before: ')
			console.log(selectedProducts)
			allSelected.push(product)
			console.log('After: ')
			console.log(selectedProducts)
			setSelectedProducts(allSelected)
			// setSelectedProducts(selectedProductsReactiveObjects(selectedProducts))

			setOrder(currentOrder)
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
						elementsList={[...selectedProducts]}
						titleFieldName="code"
						subtitleFieldName="name"
						dynamicElement={quantityInput}
						deletable
					/>

					<ProductGrid
						productsList={[...products]}
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
