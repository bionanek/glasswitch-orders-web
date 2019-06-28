import React, { useState, useEffect } from 'react'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'
import LoadingView from '../../common/LoadingView'
import IdNotFound from '../../common/IdNotFound'

function CustomerEdit(props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [customer, setCustomer] = useState(null)

	const handleSubmit = async (cust) => {
		await CustomersApiService.updateCustomer(props.match.params.id, cust)
		props.history.push(`/customers`)
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedCustomer = await CustomersApiService.getCustomerById(props.match.params.id)
			setCustomer(fetchedCustomer)
			setIsLoaded(true)
		}
		fetchData()
	}, [])

	const customerEditView = () => {
		return (
			<CustomerForm
				customer={customer}
				onSubmit={handleSubmit}
				onCancel={() => props.history.push(`/customers/${parseInt(props.match.params.id)}`)}
				submitText="Edit Customer"
			/>
		)
	}

	return <> {isLoaded ? (customer ? customerEditView() : IdNotFound()) : LoadingView()} </>
}

export default CustomerEdit
