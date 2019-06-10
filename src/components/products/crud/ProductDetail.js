import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import DetailElement from '../../common/DetailElement'
import ProductsApiService from '../../../utils/api/productsApiService'
import ImageElement from '../../common/ImageElement'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import LoadingView from '../../common/LoadingView'
import './ProductDetail.scss'

function ProductDetail(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [product, setProduct] = useState(null)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedProduct = await ProductsApiService.getProductById(props.match.params.id)
			setProduct(fetchedProduct.data)

			setIsLoaded(true)
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

	const productDetailsView = () => {
		return (
			<div>
				{product ? (
					<Container className="product-detail">
						<Row>
							<Col>
								<h1>{product.name}</h1>
							</Col>

							<Col>
								<h2>{product.code}</h2>
							</Col>

							<Col>
								<Button
									onClick={onEditClick}
									className="edit-icon-detail"
									variant="outline-secondary"
								>
									<FontAwesomeIcon icon={faEdit} size="2x" />
								</Button>

								<Button
									onClick={handleDelete}
									className="delete-icon-detail"
									variant="outline-danger"
								>
									<FontAwesomeIcon icon={faTrashAlt} size="2x" />
								</Button>
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

	return <> {isLoaded ? productDetailsView() : LoadingView()} </>
}

export default withRouter(ProductDetail)
