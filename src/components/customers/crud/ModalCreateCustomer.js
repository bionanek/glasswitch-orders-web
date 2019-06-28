import React from 'react'
import { Modal, Container } from 'react-bootstrap/'
import CustomersApiService from '../../../utils/api/customersApiService'
import CustomerForm from './CustomerForm'
import './ModalCreateCustomer.scss'

export default function ModalCreateCustomer(props) {
	const handleSubmit = async (customer) => {
		await CustomersApiService.createCustomer(customer)
		props.onModalClose()
		props.refreshList()
	}

	return (
		<Container fluid>
			<Modal show={props.isOpen} onHide={props.onModalClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Create Customer</Modal.Title>
				</Modal.Header>
				<Modal.Body className="customer-create-modal">
					<CustomerForm
						customer={{}}
						onSubmit={handleSubmit}
						onCancel={() => props.onModalClose()}
						submitText="Create Customer"
					/>
				</Modal.Body>
			</Modal>
		</Container>
	)
}
