import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductsApiService from '../../../../utils/api/productsApiService'

export default function ProductCreateModal(props) {
	const [product, setProduct] = useState({})
	const title = props.title ? props.title : 'Create a Product Modal'

	const handleModalClose = () => {
		props.onModalClose()
	}

	const handleAddCurrency = (product, price, event) => {
		if (event.target.name === 'pln' || event.target.name === 'eur' || event.target.name === 'usd') {
			if (product[price] === undefined) {
				product[price] = {
					[event.target.name]: event.target.value,
				}
			} else {
				product[price][event.target.name] = event.target.value
			}
			setProduct(product)
		}
	}

	const handleChange = event => {
		const currentProduct = { ...product }
		const price = 'price'

		if (event.target.name === 'pln' || event.target.name === 'eur' || event.target.name === 'usd') {
			handleAddCurrency(currentProduct, price, event)
		} else {
			currentProduct[event.target.name] = event.target.value
			setProduct(currentProduct)
		}
	}

	const handleConfirm = () => {
		const postData = async () => {
			await ProductsApiService.postProduct(product)
		}

		postData()
		props.onModalClose()
	}

	return (
		<div>
			<Modal show={props.isOpen} onHide={() => handleModalClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="fromName">
						<Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} />
					</Form.Group>

					<Form.Group controlId="formDescription">
						<Form.Control
							type="text"
							placeholder="Description"
							name="description"
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group controlId="formType">
						<Form.Control type="text" placeholder="Type" name="type" onChange={handleChange} />
					</Form.Group>

					<Form.Group controlId="formCategory">
						<Form.Control
							type="text"
							placeholder="Category"
							name="category"
							onChange={handleChange}
						/>
					</Form.Group>

					<Row>
						<Col>
							<Form.Group controlId="formWidth">
								<Form.Control
									type="number"
									placeholder="Width"
									name="width"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId="formHeight">
								<Form.Control
									type="number"
									placeholder="Height"
									name="height"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId="formDepth">
								<Form.Control
									type="number"
									placeholder="Depth"
									name="depth"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group controlId="formImage">
						<Form.Control type="text" placeholder="Image" name="image" onChange={handleChange} />
					</Form.Group>

					<Row>
						<Col>
							<Form.Group controlId="formPrice">
								<Form.Control
									type="number"
									placeholder="Price PLN"
									name="pln"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId="formPrice">
								<Form.Control
									type="number"
									placeholder="Price EUR"
									name="eur"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="formPrice">
								<Form.Control
									type="number"
									placeholder="Price USD"
									name="usd"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleModalClose()}>
						Close
					</Button>
					<Button variant="danger" onClick={() => handleConfirm()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
