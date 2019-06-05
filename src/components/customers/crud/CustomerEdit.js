import React, { Component } from 'react'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'
import LoadingView from '../../common/LoadingView'

class CustomerEdit extends Component {
	constructor(props) {
		super(props)

		this.state = {
			customer: null,
			isLoaded: false,
		}
	}

	async componentDidMount() {
		const customerId = parseInt(this.props.match.params.id)

		this.setState({ customer: await CustomersApiService.getCustomer(customerId), isLoaded: true })
	}

	onCancel() {
		this.props.history.push(`/customers/${parseInt(this.props.match.params.id)}`)
	}

	async handleSubmit(event, customer) {
		event.preventDefault()
		event.stopPropagation()

		const customerId = parseInt(this.props.match.params.id)
		await CustomersApiService.updateCustomer(customerId, customer)

		this.props.history.push(`/customers/${customerId}`)
	}

	render() {
		const { customer, isLoaded } = this.state
		return (
			<div>
				{isLoaded ? (
					<CustomerForm
						customer={customer}
						onSubmit={(e, cust) => this.handleSubmit(e, cust)}
						onCancel={() => this.onCancel()}
						submitText="Edit Customer"
					/>
				) : (
					LoadingView()
				)}
			</div>
		)
	}
}

export default CustomerEdit
