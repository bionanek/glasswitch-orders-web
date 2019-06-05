import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap/'
import ProductGridElement from './ProductGridElement'

export default function ProductGrid({
	productsList,
	imageSource,
	name,
	code,
	pln,
	eur,
	usd,
	clickable,
	editable,
	deletable,
	dynamicElement,
}) {
	const [products, setProducts] = useState([])

	const getProductsGridView = (isTileClickable, isTileEditable, isTileDeletable) => {
		return productsList.map((product, index) => {
			return (
				<ProductGridElement
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
					isClickable={isTileClickable}
					isEditable={isTileEditable}
					isDeletable={isTileDeletable}
				>
					{dynamicElement ? dynamicElement() : null}
				</ProductGridElement>
			)
		})
	}

	useEffect(() => {
		const elements = getProductsGridView(productsList, clickable, editable, deletable)
		setProducts(elements)
	}, [productsList, clickable, editable, deletable])

	return <Row style={{ padding: '10px' }}>{products}</Row>
}
