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

	const title = props.title ? props.title : 'Create a Product Modal'

	const handleModalClose = () => {
		props.onModalClose()
	}

	const handleAddCurrency = (currentProduct, currency, value) => {
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

	const handleChange = event => {
		let currentProduct = product
		const { id, name, value } = event.target

		if (id === 'productPrice') {
			currentProduct = handleAddCurrency(currentProduct, name, value)
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
			<Form onSubmit={handleSubmit} validated={isValidated}>
				<Form.Group controlId="productName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						onChange={handleChange}
						type="text"
						name="name"
						placeholder="Name"
						required
					/>
				</Form.Group>

				<Form.Group controlId="productDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
						onChange={handleChange}
						type="text"
						name="description"
						placeholder="Description"
						required
					/>
				</Form.Group>

				<Form.Group controlId="productType">
					<Form.Label>Type</Form.Label>
					<Form.Control
						onChange={handleChange}
						type="text"
						name="type"
						placeholder="Type"
						required
					/>
				</Form.Group>

				<Form.Group controlId="productCategory">
					<Form.Label>Category</Form.Label>
					<Form.Control
						onChange={handleChange}
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
							onChange={handleChange}
							type="number"
							name="width"
							placeholder="Width"
							required
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="productHeight">
						<Form.Label>Height</Form.Label>
						<Form.Control
							onChange={handleChange}
							type="number"
							name="height"
							placeholder="Height"
							required
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="productDepth">
						<Form.Label>Depth</Form.Label>
						<Form.Control
							onChange={handleChange}
							type="number"
							name="depth"
							placeholder="Depth"
							required
						/>
					</Form.Group>
				</Form.Row>

				<Form.Group controlId="productImage">
					<Form.Label>Image</Form.Label>
					<Form.Control
						onChange={handleChange}
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
							onChange={handleChange}
							type="number"
							name="pln"
							placeholder="Price PLN"
							required
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="productPrice">
						<Form.Label>EUR</Form.Label>
						<Form.Control
							onChange={handleChange}
							type="number"
							name="eur"
							placeholder="Price EUR"
							required
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="productPrice">
						<Form.Label>USD</Form.Label>
						<Form.Control
							onChange={handleChange}
							type="number"
							name="usd"
							placeholder="Price USD"
							required
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Button variant="secondary" onClick={() => handleModalClose()}>
						Close
					</Button>
					<Button variant="primary" type="submit">
						Confirm
					</Button>
				</Form.Row>
			</Form>
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
