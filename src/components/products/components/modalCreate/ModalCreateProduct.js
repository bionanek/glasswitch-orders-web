import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProductsApiService from '../../../../utils/api/productsApiService'
import './ModalCreateProduct.scss'

export default function ProductCreateModal(props) {
	const [product, setProduct] = useState({})
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
		let currentProduct = { ...product }

		if (event.target.id === 'productPrice') {
			currentProduct = handleAddCurrency(currentProduct, event.target.name, event.target.value)
		} else {
			currentProduct[event.target.name] = event.target.value
		}
		setProduct(currentProduct)
	}

	const handleConfirm = async () => {
		await ProductsApiService.postProduct(product)

		props.onModalClose()
		props.onRefreshList()
	}

	const productCreateForm = () => {
		return (
			<Form>
				<Form.Group controlId="productName">
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} />
				</Form.Group>

				<Form.Group controlId="productDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
						type="text"
						placeholder="Description"
						name="description"
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="productType">
					<Form.Label>Type</Form.Label>
					<Form.Control type="text" placeholder="Type" name="type" onChange={handleChange} />
				</Form.Group>

				<Form.Group controlId="productCategory">
					<Form.Label>Category</Form.Label>
					<Form.Control
						type="text"
						placeholder="Category"
						name="category"
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId="formWidth">
						<Form.Label>Width</Form.Label>
						<Form.Control type="number" placeholder="Width" name="width" onChange={handleChange} />
					</Form.Group>

					<Form.Group as={Col} controlId="formHeight">
						<Form.Label>Height</Form.Label>

						<Form.Control
							type="number"
							placeholder="Height"
							name="height"
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="formDepth">
						<Form.Label>Depth</Form.Label>

						<Form.Control type="number" placeholder="Depth" name="depth" onChange={handleChange} />
					</Form.Group>
				</Form.Row>

				<Form.Group controlId="productImage">
					<Form.Label>Image</Form.Label>
					<Form.Control type="text" placeholder="Image" name="image" onChange={handleChange} />
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId="productPrice">
						<Form.Label>PLN</Form.Label>
						<Form.Control
							type="number"
							placeholder="Price PLN"
							name="pln"
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="productPrice">
						<Form.Label>EUR</Form.Label>

						<Form.Control
							type="number"
							placeholder="Price EUR"
							name="eur"
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="productPrice">
						<Form.Label>USD</Form.Label>

						<Form.Control
							type="number"
							placeholder="Price USD"
							name="usd"
							onChange={handleChange}
						/>
					</Form.Group>
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
				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleModalClose()}>
						Close
					</Button>
					<Button variant="primary" onClick={() => handleConfirm()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
