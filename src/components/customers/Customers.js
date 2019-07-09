import React from 'react'
import ListView from '../common/listView/ListView'
import CustomersApiService from '../../utils/api/customersApiService'
import './Customers.scss'

export default function Customers() {
	return (
		<ListView
			className="customers"
			page="customers"
			createNewRecordLabel="Customer"
			getAllRecords={() => CustomersApiService.getAllCustomers()}
			searchRecords={param => CustomersApiService.searchCustomer(param)}
			deleteRecord={id => CustomersApiService.deleteCustomer(id)}
			titleFieldName="name"
			subtitleFieldName="delivery_country"
		/>
	)
}
