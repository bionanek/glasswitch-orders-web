import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import DetailElement from '../../common/DetailElement'
import ProductsApiService from '../../../utils/api/productsApiService'
import ImageElement from '../../common/ImageElement'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import LoadingView from '../../common/LoadingView'
import IdNotFound from '../../common/IdNotFound'
import './ProductDetail.scss'

function ProductDetail(props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [product, setProduct] = useState(null)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const onDeleteConfirmed = async () => {
		await ProductsApiService.deleteProduct(props.match.params.id)
		props.history.push('/products')
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedProduct = await ProductsApiService.getProductById(props.match.params.id)
			setProduct(fetchedProduct.data)
			setIsLoaded(true)
		}
		fetchData()
	}, [])

	const productDetailsView = () => {
		return (
			<Container className="product-detail">
				<Row>
					<Col sm>
						<h1>{product.name}</h1>
					</Col>

					<Col sm>
						<h2>{product.code}</h2>
					</Col>

					<Col sm>
						<Button
							onClick={() => props.history.push(`/products`)}
							className="return-icon-detail"
							variant="outline-secondary"
						>
							<FontAwesomeIcon icon={faArrowLeft} size="2x" />
						</Button>

						<Button
							onClick={() =>
								props.history.push(`/products/${parseInt(props.match.params.id)}/edit`)
							}
							className="edit-icon-detail"
							variant="outline-primary"
						>
							<FontAwesomeIcon icon={faEdit} size="2x" />
						</Button>

						<Button
							onClick={() => setIsDeleteModalOpen(true)}
							className="delete-icon-detail"
							variant="outline-danger"
						>
							<FontAwesomeIcon icon={faTrashAlt} size="2x" />
						</Button>
					</Col>
				</Row>

				<Row>
					<ImageElement
						source={`http://localhost:3001/${product.imageUrl}`}
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
					<Col sm>
						<h2>Parameters (cm)</h2>
					</Col>
				</Row>

				<Row>
					<DetailElement header="Width:" value={product.width} />
					<DetailElement header="Height:" value={product.height} />
					<DetailElement header="Depth:" value={product.depth} />
				</Row>

				<Row>
					<Col sm>
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
					onModalClose={() => setIsDeleteModalOpen(false)}
					onConfirm={onDeleteConfirmed}
				/>
			</Container>
		)
	}

	return <> {isLoaded ? (product ? productDetailsView() : IdNotFound()) : LoadingView()} </>
}

export default withRouter(ProductDetail)
