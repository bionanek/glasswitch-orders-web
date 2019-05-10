import React from 'react'
import Container from 'react-bootstrap/Container'
import ProductsList from './list/ProductsList'
import './Products.scss'

const Products = () => {
	return (
		<Container fluid>
			<div className="products">
				<ProductsList className="products-list" />
			</div>
		</Container>
	)
}

export default Products
