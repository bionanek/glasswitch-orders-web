import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import SimpleList from '../../common/simpleList/SimpleList'
import CustomersApiService from '../../../utils/api/customersApiService'
import './CustomersList.scss'

class CustomersList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			customers: [],
		}
	}

	async componentDidMount() {
		this.setState({ customers: await this.getAllCustomers() })
	}

	async getAllCustomers() {
		const response = await CustomersApiService.getAllCustomers()
		return this.getCustomersReactiveObjectsList(response.data)
	}

	getCustomersReactiveObjectsList(customersList) {
		return customersList.map(customer => {
			const customerRO = { ...customer }

			customerRO.editHandler = e => {
				e.stopPropagation()
				const editUrl = `customers/${customer.id}/edit`
				this.props.history.push(editUrl)
			}

			customerRO.clickHandler = () => {
				this.props.history.push(`customers/${customer.id}`)
			}

			customerRO.deleteHandler = async customerId => {
				const deleteResult = await CustomersApiService.deleteCustomer(customerId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					this.refreshList()
				}
			}

			return customerRO
		}, this)
	}

	async refreshList() {
		const customers = await this.getAllCustomers()

		this.setState({ customers })
  }
  
  newCustomerClicked() {
    this.props.history.push("/customers/new")
  }

	render() {
		return (
			<div className="customers-list-wrapper">
        <Button variant="success" className="new-customer-button" onClick={() => this.newCustomerClicked()}>New Customer</Button>
				<SimpleList
					elementsList={this.state.customers}
					titleFieldName="name"
					subtitleFieldName="delivery_country"
					deletable
					editable
					clickable
				/>
			</div>
		)
	}
}

export default withRouter(CustomersList)