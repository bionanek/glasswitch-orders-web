import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductCreateModal from '../components/modalCreate/ModalCreateProduct'
import ProductGrid from '../components/grid/ProductGrid'
import './ProductsList.scss'
import LoadingView from '../../common/LoadingView'

class ProductsList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			products: [],
			isProductCreateModalOpen: false,
			renderListView: true,
			isLoaded: false,
		}

		this.refreshList = this.refreshList.bind(this)
		this.openProductModal = this.openProductModal.bind(this)
		this.closeProductModal = this.closeProductModal.bind(this)
		this.renderListView = this.renderListView.bind(this)
		this.renderGridView = this.renderGridView.bind(this)
	}

	async componentDidMount() {
		const prods = await this.getAllProducts()
		this.setState({ products: prods, isLoaded: true })
	}

	async getAllProducts() {
		const response = await ProductsApiService.getAllProducts()
		return this.getProductsReactiveObjectsList(response.data)
	}

	getProductsReactiveObjectsList(productsList) {
		return productsList.map(product => {
			const productRO = { ...product }

			productRO.editHandler = e => {
				e.stopPropagation()
				const editUrl = `products/${product.id}/edit`
				this.props.history.push(editUrl)
			}

			productRO.clickHandler = () => {
				this.props.history.push(`products/${product.id}`)
			}

			productRO.deleteHandler = async productId => {
				const deleteResult = await ProductsApiService.deleteProduct(productId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					this.refreshList()
				}
			}

			return productRO
		}, this)
	}

	async refreshList() {
		const prods = await this.getAllProducts()

		this.setState({ products: prods })
	}

	openProductModal() {
		this.setState({ isProductCreateModalOpen: true })
	}

	closeProductModal() {
		this.setState({ isProductCreateModalOpen: false })
	}

	renderListView = () => {
		this.setState({ renderListView: true })
	}

	renderGridView = () => {
		this.setState({ renderListView: false })
	}

	render() {
		return (
			<>
				{this.state.isLoaded ? (
					<div>
						<Row>
							<Col>
								<Button
									className="button-create-product float-left"
									variant="primary"
									onClick={this.openProductModal}
								>
									Add Product
								</Button>

								<ButtonGroup className="buttons-layout-change float-right">
									<Button
										onClick={this.renderListView}
										variant={this.state.renderListView ? 'success' : 'secondary'}
									>
										<FontAwesomeIcon icon={faList} size="2x" />
									</Button>

									<Button
										onClick={this.renderGridView}
										variant={this.state.renderListView ? 'secondary' : 'success'}
									>
										<FontAwesomeIcon icon={faTh} size="2x" />
									</Button>
								</ButtonGroup>
							</Col>
						</Row>

						{this.state.renderListView ? (
							<Row>
								<Col>
									<div className="products-list-wrapper">
										<SimpleList
											elementsList={this.state.products}
											titleFieldName="name"
											subtitleFieldName="code"
											deletable
											editable
											clickable
										/>
									</div>
								</Col>
							</Row>
						) : (
							<ProductGrid
								className="product-grid"
								productsList={this.state.products}
								imageSource="imageUrl"
								name="name"
								code="code"
								pln="pln"
								eur="eur"
								usd="usd"
							/>
						)}

						<ProductCreateModal
							isOpen={this.state.isProductCreateModalOpen}
							onModalClose={this.closeProductModal}
							onRefreshList={this.refreshList}
						/>
					</div>
				) : (
					LoadingView()
				)}
			</>
		)
	}
}

export default withRouter(ProductsList)
