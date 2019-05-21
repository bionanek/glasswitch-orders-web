import React, { Component } from 'react'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'

class CustomerCreate extends Component {
  onCancel() {
    this.props.history.push(`/customers`)
  }

  async handleSubmit(event, customer) {
    event.preventDefault()
    event.stopPropagation()

    const response = await CustomersApiService.createCustomer(customer)

    this.props.history.push(`/customers/${response.id}`)
  }

  render() {
    return (
      <CustomerForm
        customer={{}}
        onSubmit={(e, cust) => this.handleSubmit(e, cust)}
        onCancel={() => this.onCancel()}
      />
    )
  }
}

export default CustomerCreate