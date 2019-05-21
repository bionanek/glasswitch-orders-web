import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import DetailElement from '../../common/DetailElement'
import ProductsApiService from '../../../utils/api/productsApiService'
import ImageElement from '../../common/ImageElement'
import './ProductDetail.scss'

export default function ProductDetail(props) {
	const [product, setProduct] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedProduct = await ProductsApiService.getProductById(props.match.params.id)
			setProduct(fetchedProduct.data)
		}

		fetchData()
	}, [])

	return (
		<div className="product-detail">
			{product ? (
				<Container>
					<Row>
						<Col>
							<h1>{product.name}</h1>
						</Col>

						<Col>
							<h2>{product.code}</h2>
						</Col>
					</Row>

					<Row>
						<ImageElement source={"http://localhost:3001/" + product.imageUrl} errorTxt="imageError" />
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
