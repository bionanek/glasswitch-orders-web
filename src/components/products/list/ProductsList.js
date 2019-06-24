import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button, ButtonGroup, Col, Row } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductCreateModal from '../crud/ModalCreateProduct'
import ProductGrid from '../components/grid/ProductGrid'
import LoadingView from '../../common/LoadingView'
import './ProductsList.scss'

function ProductsList(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [products, setProducts] = useState([])
	const [listView, setListView] = useState(true)
	const [isProductCreateModalOpen, setIsProductCreateModalOpen] = useState(false)

	const productsReactiveObjects = productsList => {
		return productsList.map(product => {
			const productRO = { ...product }

			productRO.clickHandler = () => {
				props.history.push(`products/${product.id}`)
			}

			productRO.editHandler = event => {
				event.stopPropagation()
				const editUrl = `products/${product.id}/edit`
				props.history.push(editUrl)
			}

			productRO.deleteHandler = async productId => {
				const deleteResult = await ProductsApiService.deleteProduct(productId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					const fetchedProducts = await ProductsApiService.getAllProducts()
					setProducts(productsReactiveObjects(fetchedProducts.data))
				}
			}

			return productRO
		})
	}

	const fetchData = async () => {
		const fetchedProducts = await ProductsApiService.getAllProducts()
		setProducts(productsReactiveObjects(fetchedProducts.data))
		setIsLoaded(true)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const renderListView = () => {
		return (
			<SimpleList
				elementsList={products}
				titleFieldName="name"
				subtitleFieldName="code"
				deletable
				editable
				clickable
			/>
		)
	}

	const renderGridView = () => {
		return (
			<ProductGrid
				productsList={products}
				imageSource="imageUrl"
				name="name"
				code="code"
				pln="pln"
				eur="eur"
				usd="usd"
			/>
		)
	}

	const productsListView = () => {
		return (
			<Container className="products-list-wrapper" fluid>
				<Row>
					<Col>
						<Button
							className="create-product-button"
							variant="primary"
							onClick={() => setIsProductCreateModalOpen(true)}
						>
							Add Product
						</Button>
					</Col>

					<Col>
						<ButtonGroup className="layout-change-buttons">
							<Button
								onClick={() => setListView(true)}
								variant={listView ? 'success' : 'secondary'}
							>
								<FontAwesomeIcon icon={faList} size="2x" />
							</Button>

							<Button
								onClick={() => setListView(false)}
								variant={listView ? 'secondary' : 'success'}
							>
								<FontAwesomeIcon icon={faTh} size="2x" />
							</Button>
						</ButtonGroup>
					</Col>
				</Row>

				{listView ? renderListView() : renderGridView()}

				<ProductCreateModal
					isOpen={isProductCreateModalOpen}
					onModalClose={() => setIsProductCreateModalOpen(false)}
					onRefreshList={fetchData}
				/>
			</Container>
		)
	}

	return <> {isLoaded ? productsListView() : LoadingView()} </>
}

export default withRouter(ProductsList)
