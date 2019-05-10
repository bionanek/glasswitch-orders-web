import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'
import ProductCreateModal from '../components/modalCreate/ModalCreateProduct'
import './ProductsList.scss'

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

		this.setState({ products: products })
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
				<Row>
					<Col>
						<Button
							className="button-create-product float-right"
							variant="primary"
							onClick={this.openProductModal}
						>
							Add Product
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
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
					</Col>
				</Row>
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
