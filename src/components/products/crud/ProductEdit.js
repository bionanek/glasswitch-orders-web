import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Form, Button, Container, InputGroup } from 'react-bootstrap/'
import ImageElement from '../../common/ImageElement'
import ProductsApiService from '../../../utils/api/productsApiService'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import buildProductData from '../ProductsUtils'

function ProductEdit(props) {
	const [product, setProduct] = useState(null)
	const [isValidated, setIsValidated] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const requestedProduct = await ProductsApiService.getProductById(props.match.params.id)
			setProduct(requestedProduct.data)
		}
		fetchData()
	}, [])

	const handleFormChange = event => {
		const currentProduct = product
		const { id, name, value, files } = event.target

		switch (id) {
			case 'productPrice':
				currentProduct.price[name] = value
				break
			case 'productImageUpload':
				currentProduct.image = files[0]
				break
			case 'productCode':
				currentProduct.code = 'GW-' + value
				break
			default:
				currentProduct[name] = value
				break
		}
		setProduct(currentProduct)
	}

	const handleEditDataConfirm = async () => {
		setIsValidated(true)
		const productData = buildProductData(product)
		await ProductsApiService.updateProduct(props.match.params.id, productData)

		props.history.push('/products')
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		event.preventDefault()

		if (form.checkValidity() === false) {
			event.stopPropagation()
		}
		handleEditDataConfirm()
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	const handleDelete = event => {
		event.stopPropagation()
		setIsDeleteModalOpen(true)
	}

	const onDeleteConfirm = async () => {
		await ProductsApiService.deleteProduct(props.match.params.id)
		props.history.push('/products')
	}

	const handleGoBack = () => {
		props.history.push('/products')
	}

	return (
		<Container className="product-edit">
			{product ? (
				<>
					<Form onSubmit={handleSubmit} validated={isValidated}>
						<Row>
							<Col>
								<Form.Group controlId="productName">
									<Form.Label>Product Name</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="name"
										defaultValue={product.name}
										required
									/>
								</Form.Group>
							</Col>

							<Col>
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
											defaultValue={product.code.split('-')[1]}
											required
										/>
									</InputGroup>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="productImage">
									<ImageElement
										source={'http://localhost:3001/' + product.imageUrl}
										errorTxt="imageError"
									/>
								</Form.Group>
							</Col>

							<Col>
								<Row>
									<Col>
										<Form.Group controlId="productImageUpload">
											<Form.Label>Image</Form.Label>
											<Form.Control onChange={handleFormChange} type="file" name="image" />
										</Form.Group>

										<Form.Group controlId="productDescription">
											<Form.Label>Description</Form.Label>
											<Form.Control
												onChange={handleFormChange}
												type="text"
												name="description"
												as="textarea"
												defaultValue={product.description}
												rows="12"
												required
											/>
										</Form.Group>
									</Col>
								</Row>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="productType">
									<Form.Label>Type</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="type"
										defaultValue={product.type}
										required
									/>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId="productCategory">
									<Form.Label>Category</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="category"
										defaultValue={product.category}
										required
									/>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="productWidth">
									<Form.Label>Width</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="width"
										defaultValue={product.width}
										required
									/>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId="productHeight">
									<Form.Label>Height</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="height"
										defaultValue={product.height}
										required
									/>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId="productDepth">
									<Form.Label>Depth</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="depth"
										defaultValue={product.depth}
										required
									/>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="productPrice">
									<Form.Label>PLN</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="pln"
										defaultValue={product.price.pln}
										required
									/>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId="productPrice">
									<Form.Label>EUR</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="eur"
										defaultValue={product.price.eur}
										required
									/>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId="productPrice">
									<Form.Label>USD</Form.Label>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="usd"
										defaultValue={product.price.usd}
										required
									/>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Button onClick={handleGoBack} variant="secondary" size="lg" block>
									Return To The List
								</Button>
							</Col>

							<Col>
								<Button onClick={handleDelete} variant="danger" size="lg" block>
									Delete Product
								</Button>
							</Col>

							<Col>
								<Button type="submit" variant="success" size="lg" block>
									Submit Changes
								</Button>
							</Col>
						</Row>
					</Form>
					<ConfirmationModal
						isOpen={isDeleteModalOpen}
						onModalClose={closeDeleteModal}
						onConfirm={onDeleteConfirm}
					/>
				</>
			) : (
				<span>
					Product with ID:
					{props.match.params.id} does not exists!
				</span>
			)}
		</Container>
	)
}

export default withRouter(ProductEdit)
