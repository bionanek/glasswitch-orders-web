import React from 'react'
import { Modal } from 'react-bootstrap/'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'
import './CustomerCreate.scss'

const CustomerCreate = (props) => {
  function onCancel() {
    props.onModalClose()
  }

  async function handleSubmit(event, customer) {
    event.preventDefault()
    event.stopPropagation()

    const response = await CustomersApiService.createCustomer(customer)

    props.history.push(`/customers/${response.id}`)
  }

  return (
    <div>
      <Modal show={props.isOpen} onHide={props.onModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="customer-create-modal">
          <CustomerForm
            customer={{}}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            submitText="Create Customer"
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CustomerCreate