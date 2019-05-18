import React, { Component } from 'react'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'

class CustomerNew extends Component {
  async handleSubmit(event, customer) {
    event.preventDefault()
    event.stopPropagation()

    const response = await CustomersApiService.createCustomer(customer)

    this.props.history.push(`/customers/${response.id}`)
  }

  render() {
    return (
      <CustomerForm customer={{}} onSubmit={(e, cust) => this.handleSubmit(e, cust)} />
    )
  }
}

export default CustomerNew