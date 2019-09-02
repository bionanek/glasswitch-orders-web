import React, { useState } from 'react'
import { Form, Modal, Col, Button, InputGroup, Container } from 'react-bootstrap/'
import ProductsApiService from '../../../../utils/api/productsApiService'
import CustomersApiService from '../../../../utils/api/customersApiService'
import buildProductData from '../../../products/ProductsUtils'

export default function CreateRecordModal(props) {
	const [isValidated, setIsValidated] = useState(false)
	const [record, setRecord] = useState({})

	const addRecordPrice = (currentRecord, currency, value) => {
		const editableRecord = { ...currentRecord }

		if (record.price === undefined) {
			editableRecord.price = {
				[currency]: value,
			}
		} else {
			editableRecord.price[currency] = value
		}
		return editableRecord
	}

	const handleFormChange = event => {
		let currentRecord = record
		const { id, name, value, files } = event.target

		switch (id) {
			case 'productPrice':
				currentRecord = addRecordPrice(currentRecord, name, value)
				break
			case 'productImageUpload':
				const file = files[0]
				currentRecord[name] = file
				break
			case 'productCode':
				currentRecord[name] = `GW-${value}`
				break
			default:
				currentRecord[name] = value
				break
		}
		setRecord(currentRecord)
	}

	const handleDataConfirm = async () => {
		setIsValidated(true)

		if (props.modalMode === 'products') {
			const productData = buildProductData(record)
			await ProductsApiService.postProduct(productData)
		} else {
			await CustomersApiService.createCustomer(record)
		}

		props.onModalClose()
		props.onRefreshList()
		setIsValidated(false)
	}

	const handleSubmit = event => {
		const form = event.currentTarget
		event.preventDefault()

		if (form.checkValidity() === false) {
			event.stopPropagation()
		}
		handleDataConfirm()
	}

	const productCreateForm = () => {
		return (
			<Container className="record-create" fluid>
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Form.Group controlId="productName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							onChange={handleFormChange}
							type="text"
							name="name"
							placeholder="Name"
							required
						/>
					</Form.Group>

					<Form.Group controlId="productCode">
						<Form.Label>Product Code</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>GW-</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="code"
								placeholder="Code"
								pattern="[^'/\x22:?<>|*\\]+"
								required
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group controlId="productDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							onChange={handleFormChange}
							type="text"
							name="description"
							placeholder="Description"
							required
						/>
					</Form.Group>

					<Form.Group controlId="productType">
						<Form.Label>Type</Form.Label>
						<Form.Control
							onChange={handleFormChange}
							type="text"
							name="type"
							placeholder="Type"
							required
						/>
					</Form.Group>

					<Form.Group controlId="productCategory">
						<Form.Label>Category</Form.Label>
						<Form.Control
							onChange={handleFormChange}
							type="text"
							name="category"
							placeholder="Category"
							required
						/>
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="productWidth">
							<Form.Label>Width</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="double"
								name="width"
								placeholder="Width"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="productHeight">
							<Form.Label>Height</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="double"
								name="height"
								placeholder="Height"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="productDepth">
							<Form.Label>Depth</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="double"
								name="depth"
								placeholder="Depth"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="productImageUpload">
						<Form.Label>Image</Form.Label>
						<Form.Control onChange={handleFormChange} type="file" name="image" required />
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="productPrice">
							<Form.Label>PLN</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="double"
								name="pln"
								placeholder="Price PLN"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="productPrice">
							<Form.Label>EUR</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="double"
								name="eur"
								placeholder="Price EUR"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="productPrice">
							<Form.Label>USD</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="double"
								name="usd"
								placeholder="Price USD"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Button className="button-create" variant="success" type="submit" block>
							Confirm
						</Button>
					</Form.Row>
				</Form>
			</Container>
		)
	}

	const customerCreateForm = () => {
		return (
			<Container className="record-create" fluid>
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Form.Row>
						<Form.Group as={Col} controlId="customerName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="name"
								placeholder="Customer's Full Name"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="customerEmail">
							<Form.Label>Email Adress</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="email"
								name="email"
								placeholder="Email Adress"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="customerPhone">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							onChange={handleFormChange}
							type="text"
							name="phone"
							placeholder="Phone Number"
						/>
					</Form.Group>

					<Form.Group controlId="customerVat">
						<Form.Label>VAT Number</Form.Label>
						<Form.Control
							onChange={handleFormChange}
							type="text"
							name="vatNumber"
							placeholder="VAT Number"
							required
						/>
					</Form.Group>

					<Form.Row>
						<Form.Label as={Col} style={{ fontSize: '32px', margin: 'auto', marginBottom: '10px' }}>
							Delivery Adress
						</Form.Label>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="deliveryCountry">
							<Form.Label>Delivery Country</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="delivery_country"
								placeholder="Delivery Country"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="deliveryCity">
							<Form.Label>Delivery City</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="delivery_city"
								placeholder="Delivery City"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="deliveryStreet">
							<Form.Label>Delivery Street</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="delivery_street"
								placeholder="Delivery Street"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="deliveryPostcode">
							<Form.Label>Delivery PostCode</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="delivery_postCode"
								placeholder="Delivery PostCode"
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Label as={Col} style={{ fontSize: '32px', margin: 'auto', marginBottom: '10px' }}>
							Billing Adress
						</Form.Label>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="billingCountry">
							<Form.Label>Billing Country</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="billing_country"
								placeholder="Billing Country"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="billingCity">
							<Form.Label>Billing City</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="billing_city"
								placeholder="Billing City"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="billingStreet">
							<Form.Label>Billing Street</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="billing_street"
								placeholder="Billing Street"
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="billingPostcode">
							<Form.Label>Billing PostCode</Form.Label>
							<Form.Control
								onChange={handleFormChange}
								type="text"
								name="billing_postCode"
								placeholder="Billing PostCode"
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Button className="button-create" variant="success" type="submit" block>
							Confirm
						</Button>
					</Form.Row>
				</Form>
			</Container>
		)
	}

	return (
		<Container>
			<Modal show={props.isOpen} onHide={() => props.onModalClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{props.titleLabel}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.modalMode === 'products' ? productCreateForm() : customerCreateForm()}
				</Modal.Body>
			</Modal>
		</Container>
	)
}
