import React, { useState, useReducer, useEffect } from 'react'
import { Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { ProductReducers, InitialProductState, onDeleteConfirm } from './ProductReducers'
import ProductsApiService from '../../../utils/api/productsApiService'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import LoadingView from '../../common/LoadingView'
import ImageElement from '../../common/ImageElement'
import './ProductCRUD.scss'

export default function ProductCRUD(props) {
	const [productStates, productDispatch] = useReducer(ProductReducers, InitialProductState)
	const [isValidated, setIsValidated] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const renderEditView = async () => {
		const fetchedProduct = await ProductsApiService.getProductById(props.match.params.id)
		productDispatch({ type: 'PRODUCT_DATA_INIT', product: fetchedProduct.data })
	}

	const renderDetailsView = async () => {
		const fetchedProduct = await ProductsApiService.getProductById(props.match.params.id)
		productDispatch({ type: 'PRODUCT_DATA_INIT', product: fetchedProduct.data, detailsView: true })
	}

	const handleFormChange = event => {
		const currentProduct = productStates.product
		const { id, name, value, files } = event.target

		switch (id) {
			case 'productPrice':
				currentProduct.price[name] = value
				break
			case 'productImageUpload':
				currentProduct.image = files[0]
				break
			case 'productCode':
				currentProduct.code = `GW-${value}`
				break
			default:
				currentProduct[name] = value
				break
		}
		productDispatch({ type: 'HANDLE_FORM_CHANGE', currentProduct })
	}

	const handleDataConfirm = async () => {
		setIsValidated(true)
		const currentProduct = productStates.product
		await ProductsApiService.updateProduct(props.match.params.id, currentProduct)
		props.history.push(`/products/`)
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		event.preventDefault()
		if (form.checkValidity() === false) event.stopPropagation()
		handleDataConfirm()
	}

	useEffect(() => {
		if (props.match.path.split(':id/')[1] === 'edit') renderEditView()
		else renderDetailsView()
	}, [])

	const productCRUDView = () => {
		return (
			<Container className="product-crud">
				<Form onSubmit={handleSubmit} validated={isValidated}>
					<Row>
						<Col sm>
							<Form.Group controlId="productName">
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="name"
									defaultValue={productStates.product === null ? null : productStates.product.name}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productCode">
								<Form.Label>Product Code</Form.Label>
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text style={{ color: 'black' }}>GW-</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										onChange={handleFormChange}
										type="text"
										name="code"
										defaultValue={
											productStates.product === null
												? null
												: productStates.product.code.split('GW-')[1]
										}
										pattern="[^'/\x22:?<>|*\\]+"
										disabled={productStates.isDetailsViewRequested}
										required
									/>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="productImage">
								<ImageElement
									source={
										productStates.product === null
											? null
											: `http://localhost:3001/${productStates.product.imageUrl}`
									}
									errorTxt="imageError"
								/>
							</Form.Group>
						</Col>

						<Col>
							<Row>
								<Col sm>
									<Form.Group controlId="productImageUpload">
										<Form.Label>Image</Form.Label>
										<Form.Control
											onChange={handleFormChange}
											style={{ color: 'white' }}
											type="file"
											name="image"
											disabled={productStates.isDetailsViewRequested}
										/>
									</Form.Group>

									<Form.Group controlId="productDescription">
										<Form.Label>Description</Form.Label>
										<Form.Control
											onChange={handleFormChange}
											type="text"
											name="description"
											as="textarea"
											defaultValue={
												productStates.product === null ? null : productStates.product.description
											}
											rows="12"
											disabled={productStates.isDetailsViewRequested}
											required
										/>
									</Form.Group>
								</Col>
							</Row>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="productType">
								<Form.Label>Type</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="type"
									defaultValue={productStates.product === null ? null : productStates.product.type}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productCategory">
								<Form.Label>Category</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="category"
									defaultValue={
										productStates.product === null ? null : productStates.product.category
									}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="productWidth">
								<Form.Label>Width</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="width"
									defaultValue={productStates.product === null ? null : productStates.product.width}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productHeight">
								<Form.Label>Height</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="height"
									defaultValue={
										productStates.product === null ? null : productStates.product.height
									}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productDepth">
								<Form.Label>Depth</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="depth"
									defaultValue={productStates.product === null ? null : productStates.product.depth}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm>
							<Form.Group controlId="productPrice">
								<Form.Label>PLN</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="pln"
									defaultValue={
										productStates.product === null ? null : productStates.product.price.pln
									}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productPrice">
								<Form.Label>EUR</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="eur"
									defaultValue={
										productStates.product === null ? null : productStates.product.price.eur
									}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>

						<Col sm>
							<Form.Group controlId="productPrice">
								<Form.Label>USD</Form.Label>
								<Form.Control
									onChange={handleFormChange}
									type="text"
									name="usd"
									defaultValue={
										productStates.product === null ? null : productStates.product.price.usd
									}
									disabled={productStates.isDetailsViewRequested}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					{productStates.isDetailsViewRequested ? (
						<Row>
							<Col sm>
								<Button onClick={() => props.history.push(`/products/`)} variant="secondary" block>
									Return
								</Button>
							</Col>

							<Col sm>
								<Button onClick={() => setIsDeleteModalOpen(true)} variant="danger" block>
									Delete
								</Button>
							</Col>

							<Col sm>
								<Button onClick={() => renderEditView()} variant="primary" block>
									Customize Product
								</Button>
							</Col>
						</Row>
					) : (
						<Row>
							<Col sm>
								<Button onClick={() => props.history.push(`/products/`)} variant="danger" block>
									Cancel
								</Button>
							</Col>

							<Col sm>
								<Button variant="success" type="submit" block>
									Submit
								</Button>
							</Col>
						</Row>
					)}
					<ConfirmationModal
						isOpen={isDeleteModalOpen}
						onModalClose={() => setIsDeleteModalOpen(false)}
						onConfirm={() => onDeleteConfirm(props.history, props.match.params.id)}
					/>
				</Form>
			</Container>
		)
	}

	return <> {productStates.isLoaded ? productCRUDView() : LoadingView()} </>
}
