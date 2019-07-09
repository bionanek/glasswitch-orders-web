import React from 'react'
import ListView from '../common/listView/ListView'
import OrdersApiService from '../../utils/api/ordersApiService'
import './Orders.scss'

export default function Orders() {
	return (
		<ListView
			className="orders"
			page="orders"
			createNewRecordLabel="Order"
			createButtonLabel="New Customer"
			getAllRecords={() => OrdersApiService.getAllOrders()}
			searchRecords={param => OrdersApiService.searchOrder(param)}
			deleteRecord={id => OrdersApiService.deleteOrder(id)}
			titleFieldName="email"
			subtitleFieldName="deadline"
		/>
	)
}
