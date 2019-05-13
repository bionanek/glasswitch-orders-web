import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Form, Button, Container } from 'react-bootstrap/'
import ImageElement from '../../common/ImageElement'
import ProductsApiService from '../../../utils/api/productsApiService'

function ProductEdit(props) {
	const [product, setProduct] = useState(null)
	const [isValidated, setIsValidated] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const requestedProduct = await ProductsApiService.getProductById(props.match.params.id)
			setProduct(requestedProduct.data)
		}

		fetchData()
	}, [])

	const handleChange = event => {
		const currentProduct = product
		const { id, name, value } = event.target

		if (id === 'productPrice') {
			currentProduct.price[name] = value
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
			await ProductsApiService.updateProduct(props.match.params.id, product)
			props.history.push(`/products`)
			setIsValidated(false)
		}
	}

	const handleDelete = async () => {
		await ProductsApiService.deleteProduct(props.match.params.id)
		props.history.push(`/products`)
	}

	const handleGoBack = () => {
		props.history.push(`/products`)
	}

	return (
		<div className="product-edit">
			{product ? (
				<Container>
					<Form onSubmit={handleSubmit} validated={isValidated}>
						<Row>
							<Col sm>
								<Form.Group controlId="productName">
									<Form.Label>Name</Form.Label>
									<Form.Control
										onChange={handleChange}
										type="text"
										name="name"
										defaultValue={product.name}
										required
									/>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="productImage">
									<ImageElement source={product.image} errorTxt="imageError" />
								</Form.Group>
							</Col>

							<Col>
								<Row>
									<Col sm>
										<Form.Group controlId="productImageUrl">
											<Form.Label>Image URL</Form.Label>
											<Form.Control
												onChange={handleChange}
												type="text"
												name="image"
												defaultValue={product.image}
												required
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col sm>
										<Form.Group controlId="productDescription">
											<Form.Label>Description</Form.Label>
											<Form.Control
												onChange={handleChange}
												type="text"
												name="description"
												as="textarea"
												defaultValue={product.description}
												rows="9"
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
										onChange={handleChange}
										type="text"
										name="type"
										defaultValue={product.type}
										required
									/>
								</Form.Group>
							</Col>

							<Col sm>
								<Form.Group controlId="productCategory">
									<Form.Label>Category</Form.Label>
									<Form.Control
										onChange={handleChange}
										type="text"
										name="category"
										defaultValue={product.category}
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
										onChange={handleChange}
										type="text"
										name="width"
										defaultValue={product.width}
										required
									/>
								</Form.Group>
							</Col>

							<Col sm>
								<Form.Group controlId="productHeight">
									<Form.Label>Height</Form.Label>
									<Form.Control
										onChange={handleChange}
										type="text"
										name="height"
										defaultValue={product.height}
										required
									/>
								</Form.Group>
							</Col>

							<Col sm>
								<Form.Group controlId="productDepth">
									<Form.Label>Depth</Form.Label>
									<Form.Control
										onChange={handleChange}
										type="text"
										name="depth"
										defaultValue={product.depth}
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
										onChange={handleChange}
										type="text"
										name="pln"
										defaultValue={product.price.pln}
										required
									/>
								</Form.Group>
							</Col>

							<Col sm>
								<Form.Group controlId="productPrice">
									<Form.Label>EUR</Form.Label>
									<Form.Control
										onChange={handleChange}
										type="text"
										name="eur"
										defaultValue={product.price.eur}
										required
									/>
								</Form.Group>
							</Col>

							<Col sm>
								<Form.Group controlId="productPrice">
									<Form.Label>USD</Form.Label>
									<Form.Control
										onChange={handleChange}
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
								<Button onClick={handleGoBack} variant="outline-secondary" size="lg" block>
									Return To The List
								</Button>
							</Col>

							<Col>
								<Button onClick={handleDelete} variant="outline-danger" size="lg" block>
									Delete Product
								</Button>
							</Col>

							<Col>
								<Button type="submit" variant="outline-primary" size="lg" block>
									Submit Changes
								</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			) : (
				<span>
					Product with ID:
					{props.match.params.id} does not exists!
				</span>
			)}
		</div>
	)
}

export default withRouter(ProductEdit)
