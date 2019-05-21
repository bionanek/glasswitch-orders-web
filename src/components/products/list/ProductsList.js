import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductCreateModal from '../components/modalCreate/ModalCreateProduct'
import ProductTile from '../components/tile/ProductTile'
import './ProductsList.scss'

class ProductsList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			products: [],
			isProductCreateModalOpen: false,
			renderListView: true,
		}

		this.refreshList = this.refreshList.bind(this)
		this.openProductModal = this.openProductModal.bind(this)
		this.closeProductModal = this.closeProductModal.bind(this)
		this.renderListView = this.renderListView.bind(this)
		this.renderGridView = this.renderGridView.bind(this)
	}

	async componentDidMount() {
		const prods = await this.getAllProducts()
		this.setState({ products: prods })
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
		const prods = this.state.products
		const layoutState = this.state.renderListView

		return (
			<>
				<Row>
					<Col>
						<Button
							className="button-create-product float-left"
							variant="secondary"
							onClick={this.openProductModal}
						>
							Add Product
						</Button>

						<ButtonGroup className="buttons-layout-change float-right">
							<Button variant="secondary" onClick={this.renderListView}>
								<FontAwesomeIcon icon={faList} size="2x" />
							</Button>
							<Button variant="secondary" onClick={this.renderGridView}>
								<FontAwesomeIcon icon={faTh} size="2x" />
							</Button>
						</ButtonGroup>
					</Col>
				</Row>

				{layoutState ? (
					<Row>
						<Col>
							<div className="products-list-wrapper">
								<SimpleList
									elementsList={prods}
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
					<Row className="product-tile">
						<ProductTile
							productsList={prods}
							imageSource="imageUrl"
							name="name"
							code="code"
							pln="pln"
							eur="eur"
							usd="usd"
							clickable
							editable
							deletable
						/>
					</Row>
				)}

				<ProductCreateModal
					isOpen={this.state.isProductCreateModalOpen}
					onModalClose={this.closeProductModal}
					onRefreshList={this.refreshList}
				/>
			</>
		)
	}
}

export default withRouter(ProductsList)
