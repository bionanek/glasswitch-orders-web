import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import DetailElement from '../../common/DetailElement'
import CustomersApiService from '../../../utils/api/customersApiService'
import ConfirmationModal from '../../common/modals/confirmationModal/ConfirmationModal'
import LoadingView from '../../common/LoadingView'
import IdNotFound from '../../common/IdNotFound'
import './CustomerDetail.scss'

function CustomerDetail(props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [customer, setCustomer] = useState(null)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const onDeleteConfirmed = async () => {
		await CustomersApiService.deleteProduct(props.match.params.id)
		props.history.push('/customers')
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedCustomer = await CustomersApiService.getCustomerById(props.match.params.id)
			setCustomer(fetchedCustomer)
			setIsLoaded(true)
		}
		fetchData()
	}, [])

	const customerDetailsView = () => {
		return (
			<Container className="customer-detail">
				<Row>
					<Col sm>
						<h1>{customer.name}</h1>
					</Col>

					<Col sm>
						<Button
							onClick={() => props.history.push(`/customers`)}
							className="return-icon-detail"
							variant="outline-secondary"
						>
							<FontAwesomeIcon icon={faArrowLeft} size="2x" />
						</Button>

						<Button
							onClick={() =>
								props.history.push(`/customers/${parseInt(props.match.params.id)}/edit`)
							}
							className="edit-icon-detail"
							variant="outline-primary"
						>
							<FontAwesomeIcon icon={faEdit} size="2x" />
						</Button>

						<Button
							onClick={() => setIsDeleteModalOpen(true)}
							className="delete-icon-detail"
							variant="outline-danger"
						>
							<FontAwesomeIcon icon={faTrashAlt} size="2x" />
						</Button>
					</Col>
				</Row>

				<Row>
					<DetailElement header="Email address:" value={customer.email} />
					<DetailElement header="Phone number:" value={customer.phone} />
					<DetailElement header="VAT identification number:" value={customer.vatNumber} />
				</Row>

				<Row>
					<Col>
						<h2>Delivery address</h2>
					</Col>
				</Row>

				<Row>
					<DetailElement header="Street:" value={customer.delivery_street} />
					<DetailElement header="City:" value={customer.delivery_city} />
					<DetailElement header="Country:" value={customer.delivery_country} />
					<DetailElement header="Postcode:" value={customer.delivery_postCode} />
				</Row>

				<Row>
					<Col>
						<h2>Billing address</h2>
					</Col>
				</Row>

				<Row>
					<DetailElement header="Street:" value={customer.billing_street} />
					<DetailElement header="City:" value={customer.billing_city} />
					<DetailElement header="Country:" value={customer.billing_country} />
					<DetailElement header="Postcode:" value={customer.billing_postCode} />
				</Row>

				<ConfirmationModal
					isOpen={isDeleteModalOpen}
					onModalClose={() => isDeleteModalOpen(false)}
					onConfirm={onDeleteConfirmed}
				/>
			</Container>
		)
	}

	return <> {isLoaded ? (customer ? customerDetailsView() : IdNotFound()) : LoadingView()} </>
}

export default withRouter(CustomerDetail)
