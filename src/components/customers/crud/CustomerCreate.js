import React from 'react'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'

const CustomerCreate = (props) => {
  function onCancel() {
    props.history.push(`/customers`)
  }

  async function handleSubmit(event, customer) {
    event.preventDefault()
    event.stopPropagation()

    const response = await CustomersApiService.createCustomer(customer)

    props.history.push(`/customers/${response.id}`)
  }

  return (
    <CustomerForm
      customer={{}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  )
}

export default CustomerCreate