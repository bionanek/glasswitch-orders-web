import React from 'react'
import ListView from '../common/listView/ListView'
import ProductsApiService from '../../utils/api/productsApiService'
import './Products.scss'

export default function Products() {
	return (
		<ListView
			className="products"
			page="products"
			createNewRecordLabel="Product"
			getAllRecords={() => ProductsApiService.getAllProducts()}
			deleteRecord={id => ProductsApiService.deleteProduct(id)}
			titleFieldName="name"
			subtitleFieldName="code"
		/>
	)
}
