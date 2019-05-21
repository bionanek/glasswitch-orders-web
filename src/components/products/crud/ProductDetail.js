import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import DetailElement from '../../common/DetailElement'
import ProductsApiService from '../../../utils/api/productsApiService'
import ImageElement from '../../common/ImageElement'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import './ProductDetail.scss'

function ProductDetail(props) {
	const [product, setProduct] = useState(null)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedProduct = await ProductsApiService.getProductById(props.match.params.id)
			setProduct(fetchedProduct.data)
		}

		fetchData()
	}, [])

	const onEditClick = () => {
		props.history.push(`/products/${parseInt(props.match.params.id)}/edit`)
	}

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true)
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	const handleDelete = event => {
		event.stopPropagation()
		openDeleteModal()
	}

	const onDeleteConfirm = async () => {
		await ProductsApiService.deleteProduct(props.match.params.id)
		props.history.push('/products')
	}

	return (
		<Container className="product-detail">
			{product ? (
				<>
					<Row>
						<Col>
							<h1>{product.name}</h1>
						</Col>

						<Col>
							<h2>{product.code}</h2>
						</Col>

						<Col>
							<span className="edit-icon-detail" onClick={onEditClick}>
								<FontAwesomeIcon icon={faEdit} size="2x" />
							</span>

							<span className="delete-icon-detail" onClick={handleDelete}>
								<FontAwesomeIcon icon={faTrashAlt} size="2x" />
							</span>
						</Col>
					</Row>

					<Row>
						<ImageElement
							source={'http://localhost:3001/' + product.imageUrl}
							errorTxt="imageError"
						/>
						<Col />
						<DetailElement header="Description:" value={product.description} />
					</Row>

					<Row>
						<DetailElement header="Type:" value={product.type} />
						<Col />
						<DetailElement header="Category:" value={product.category} />
					</Row>

					<Row>
						<Col>
							<h2>Parameters (cm)</h2>
						</Col>
					</Row>

					<Row>
						<DetailElement header="Width:" value={product.width} />
						<DetailElement header="Height:" value={product.height} />
						<DetailElement header="Depth:" value={product.depth} />
					</Row>

					<Row>
						<Col>
							<h2>Prices</h2>
						</Col>
					</Row>

					<Row>
						<DetailElement header="Polish Zloty (PLN):" value={product.price.pln} />
						<DetailElement header="Euro (EUR):" value={product.price.eur} />
						<DetailElement header="US Dollar (USD):" value={product.price.usd} />
					</Row>

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

export default withRouter(ProductDetail)