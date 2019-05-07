import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DetailElement from '../../common/DetailElement'
import ProductsApiService from '../../../utils/api/productsApiService'
import './ProductDetail.scss'

export default class ProductDetail extends Component {
	constructor(props) {
		super(props)

		this.state = {
			product: null,
		}
	}

	async componentDidMount() {
		this.setState({ product: await this.getProductById() })
	}

	async getProductById() {
		const response = await ProductsApiService.getProductById(this.props.match.params.id)
		return response.data
	}

	render() {
		const { product } = this.state

		return (
			<div className="product-detail">
				{product ? (
					<Container>
						<Row>
							<Col>
								<h1>{product.name}</h1>
							</Col>
						</Row>

						<Row>
							<DetailElement header="Description:" value={product.description} />
							<DetailElement header="Type:" value={product.type} />
							<DetailElement header="Category:" value={product.category} />
						</Row>

						<Row>
							<Col>
								<h2>Parameters</h2>
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
					</Container>
				) : (
					<span>
						Product with ID:
						{this.props.match.params.id} does not exists!
					</span>
				)}
			</div>
		)
	}
}
