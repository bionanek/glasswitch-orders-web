import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap/'
import ProductTileElement from './ProductTileElement'

export default function ProductTile({ productsList, imageSource, name, code, pln, eur, usd }) {
	const [products, setProducts] = useState([])

	const getProductsGridView = () => {
		return productsList.map((product, index) => {
			return (
				<ProductTileElement
					key={product.id ? product.id : index}
					index={index}
					element={product}
					id={product.id}
					imageUrl={'http://localhost:3001/' + product[imageSource]}
					productName={product[name]}
					productCode={product[code]}
					pricePLN={product.price[pln]}
					priceEUR={product.price[eur]}
					priceUSD={product.price[usd]}
				/>
			)
		})
	}

	useEffect(() => {
		const elements = getProductsGridView(productsList)
		setProducts(elements)
	}, [productsList])

	return <Row>{products}</Row>
}
