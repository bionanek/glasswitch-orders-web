import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button, ButtonGroup, Col, Row } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductCreateModal from '../components/modalCreate/ModalCreateProduct'
import ProductGrid from '../components/grid/ProductGrid'
import LoadingView from '../../common/LoadingView'
import './ProductsList.scss'

function ProductsList(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [products, setProducts] = useState([])
	const [listView, setListView] = useState(true)
	const [isProductCreateModalOpen, setIsProductCreateModalOpen] = useState(false)

	const getProductsReactiveObjectsList = productsList => {
		return productsList.map(product => {
			const productRO = { ...product }

			productRO.editHandler = e => {
				e.stopPropagation()
				const editUrl = `products/${product.id}/edit`
				props.history.push(editUrl)
			}

			productRO.clickHandler = () => {
				props.history.push(`products/${product.id}`)
			}

			productRO.deleteHandler = async productId => {
				const deleteResult = await ProductsApiService.deleteProduct(productId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					const response = await ProductsApiService.getAllProducts()
					setProducts(getProductsReactiveObjectsList(response.data))
				}
			}

			return productRO
		})
	}

	const refreshList = async () => {
		const response = await ProductsApiService.getAllProducts()
		setProducts(getProductsReactiveObjectsList(response.data))
	}

	useEffect(() => {
		const fetchData = async () => {
			refreshList()
			setIsLoaded(true)
		}
		fetchData()
	}, [])

	return (
		<Container className="products-list-wrapper" fluid>
			{isLoaded ? (
				<>
					<Row>
						<Col>
							<Button
								onClick={() => setIsProductCreateModalOpen(true)}
								className="new-product-button"
								variant="primary"
							>
								Add Product
							</Button>

							<ButtonGroup className="layout-change-button">
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

					{listView ? (
						<SimpleList
							elementsList={products}
							titleFieldName="name"
							subtitleFieldName="code"
							deletable
							editable
							clickable
						/>
					) : (
						<ProductGrid
							productsList={products}
							imageSource="imageUrl"
							name="name"
							code="code"
							pln="pln"
							eur="eur"
							usd="usd"
						/>
					)}

					<ProductCreateModal
						isOpen={isProductCreateModalOpen}
						onModalClose={() => setIsProductCreateModalOpen(false)}
						onRefreshList={refreshList}
					/>
				</>
			) : (
				LoadingView()
			)}
		</Container>
	)
}

export default withRouter(ProductsList)
