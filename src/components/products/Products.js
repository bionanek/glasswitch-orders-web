import React from 'react'
import Container from 'react-bootstrap/Container'
import ProductsList from './list/ProductsList'
import './Products.scss'

const Products = () => {
	return (
		<Container className="products" fluid>
			<ProductsList className="products-list" />
		</Container>
	)
}

export default Products
