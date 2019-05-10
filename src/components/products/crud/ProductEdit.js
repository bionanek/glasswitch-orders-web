import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

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
									<Form.Label className="form-edit">Name</Form.Label>
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
											<Form.Label className="form-edit">Image URL</Form.Label>
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
											<Form.Label className="form-edit">Description</Form.Label>
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
									<Form.Label className="form-edit">Type</Form.Label>
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
									<Form.Label className="form-edit">Category</Form.Label>
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
									<Form.Label className="form-edit">Width</Form.Label>
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
									<Form.Label className="form-edit">Height</Form.Label>
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
									<Form.Label className="form-edit">Depth</Form.Label>
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
									<Form.Label className="form-edit">PLN</Form.Label>
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
									<Form.Label className="form-edit">EUR</Form.Label>
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
									<Form.Label className="form-edit">USD</Form.Label>
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
								<Button variant="secondary" onClick={handleGoBack}>
									Return To The List
								</Button>
							</Col>

							<Col>
								<Button variant="danger" onClick={handleDelete}>
									Delete Product
								</Button>
							</Col>

							<Col>
								<Button variant="primary" type="submit">
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
