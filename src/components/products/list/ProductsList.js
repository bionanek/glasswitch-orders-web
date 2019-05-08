import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductCreateModal from '../components/modalCreate/ModalCreateProduct'
import '../components/modalCreate/ButtonCreateProduct.scss'

class ProductsList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			products: [],
			isProductCreateModalOpen: false,
		}

		this.refreshList = this.refreshList.bind(this)
		this.openProductModal = this.openProductModal.bind(this)
		this.closeProductModal = this.closeProductModal.bind(this)
	}

	async componentDidMount() {
		this.setState({ products: await this.getAllProducts() })
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
		const products = await this.getAllProducts()

		this.setState({ products })
	}

	openProductModal() {
		this.setState({ isProductCreateModalOpen: true })
	}

	closeProductModal() {
		this.setState({ isProductCreateModalOpen: false })
	}

	render() {
		return (
			<>
				<div>
					<Button
						className="button-create-product"
						variant="danger"
						onClick={this.openProductModal}
					>
						Create a Product
					</Button>
					<ProductCreateModal
						isOpen={this.state.isProductCreateModalOpen}
						onModalClose={this.closeProductModal}
						onRefreshList={this.refreshList}
					/>
				</div>
				<div className="products-list-wrapper">
					<SimpleList
						elements={this.state.products}
						titleFieldName="name"
						subtitleFieldName="description"
						deletable
						editable
						clickable
					/>
				</div>
			</>
		)
	}
}

export default withRouter(ProductsList)
