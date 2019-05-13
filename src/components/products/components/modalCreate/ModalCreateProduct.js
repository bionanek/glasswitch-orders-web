import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProductsApiService from '../../../../utils/api/productsApiService'
import './ModalCreateProduct.scss'

export default function ProductCreateModal(props) {
	const [product, setProduct] = useState({})
	const [isValidated, setIsValidated] = useState(false)

	const title = props.title ? props.title : 'Create Product'

	const handleModalClose = () => {
		props.onModalClose()
	}

	const addProductPrice = (currentProduct, currency, value) => {
		const editableProduct = { ...currentProduct }

		if (product.price === undefined) {
			editableProduct.price = {
				[currency]: value,
			}
		} else {
			editableProduct.price[currency] = value
		}
		return editableProduct
	}

	const handleFormControlChange = event => {
		let currentProduct = product
		const { id, name, value } = event.target

		if (id === 'productPrice') {
			currentProduct = addProductPrice(currentProduct, name, value)
		} else {
			currentProduct[name] = value
		}
		setProduct(currentProduct)
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		event.preventDefault()

		if (form.checkValidity() === false) {
			event.stopPropagation()
		} else {
			setIsValidated(true)
			await ProductsApiService.postProduct(product)

			props.onModalClose()
			props.onRefreshList()
			setIsValidated(false)
		}
	}

	const productCreateForm = () => {
		return (
			<div className="product-create">
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Form.Group controlId="productName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							onChange={handleFormControlChange}
							type="text"
							name="name"
							placeholder="Name"
							required
						/>
					</Form.Group>

					<Form.Group controlId="productDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							onChange={handleFormControlChange}
							type="text"
							name="description"
							placeholder="Description"
							required
						/>
					</Form.Group>

					<Form.Group controlId="productType">
						<Form.Label>Type</Form.Label>
						<Form.Control
							onChange={handleFormControlChange}
							type="text"
							name="type"
							placeholder="Type"
							required
						/>
					</Form.Group>

					<Form.Group controlId="productCategory">
						<Form.Label>Category</Form.Label>
						<Form.Control
							onChange={handleFormControlChange}
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
								onChange={handleFormControlChange}
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
								onChange={handleFormControlChange}
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
								onChange={handleFormControlChange}
								type="double"
								name="depth"
								placeholder="Depth"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="productImage">
						<Form.Label>Image</Form.Label>
						<Form.Control
							onChange={handleFormControlChange}
							type="text"
							name="image"
							placeholder="Image"
							required
						/>
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="productPrice">
							<Form.Label>PLN</Form.Label>
							<Form.Control
								onChange={handleFormControlChange}
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
								onChange={handleFormControlChange}
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
								onChange={handleFormControlChange}
								type="double"
								name="usd"
								placeholder="Price USD"
								pattern="[0-9]+([,\.][0-9]+)?"
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Button className="button-create" variant="primary" type="submit">
							Confirm
						</Button>
					</Form.Row>
				</Form>
			</div>
		)
	}

	return (
		<div>
			<Modal show={props.isOpen} onHide={() => handleModalClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{productCreateForm()}</Modal.Body>
			</Modal>
		</div>
	)
}
