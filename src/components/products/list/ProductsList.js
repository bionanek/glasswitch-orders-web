import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SimpleList from '../../common/simpleList/SimpleList'
import ProductsApiService from '../../../utils/api/productsApiService'

class ProductsList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			products: [],
		}
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
		const products = await this.getAllProducts()

		this.setState({ products })
	}

	render() {
		const prods = this.state.products
		return (
			<div className="products-list-wrapper">
				<SimpleList
					elementsList={prods}
					titleFieldName="name"
					subtitleFieldName="description"
					deletable
					editable
					clickable
				/>
			</div>
		)
	}
}

export default withRouter(ProductsList)
