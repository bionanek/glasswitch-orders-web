import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap/'
import SimpleList from '../../common/simpleList/SimpleList'
import CustomersApiService from '../../../utils/api/customersApiService'
import ModalCreateCustomer from '../crud/ModalCreateCustomer'
import LoadingView from '../../common/LoadingView'
import './CustomersList.scss'

function CustomersList(props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [customers, setCustomers] = useState([])
	const [isCustomerCreateModalOpen, setIsCustomerCreateModalOpen] = useState(false)

	const customersReactiveObjects = customersList => {
		return customersList.map(customer => {
			const customerRO = { ...customer }

			customerRO.clickHandler = () => {
				props.history.push(`customers/${customer.id}`)
			}

			customerRO.editHandler = event => {
				event.stopPropagation()
				const editUrl = `customers/${customer.id}/edit`
				props.history.push(editUrl)
			}

			customerRO.deleteHandler = async customerId => {
				const deleteResult = await CustomersApiService.deleteCustomer(customerId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					const fetchedCustomers = await CustomersApiService.getAllCustomers()
					setCustomers(customersReactiveObjects(fetchedCustomers.data))
				}
			}

			return customerRO
		})
	}

	const fetchData = async () => {
		const fetchedCustomers = await CustomersApiService.getAllCustomers()
		setCustomers(customersReactiveObjects(fetchedCustomers.data))
		setIsLoaded(true)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const customersListView = () => {
		return (
			<Container className="customers-list-wrapper" fluid>
				<Row>
					<Col>
						<Button
							variant="primary"
							className="create-customer-button"
							onClick={() => setIsCustomerCreateModalOpen(true)}
						>
							New Customer
						</Button>
					</Col>
				</Row>

				<SimpleList
					elementsList={customers}
					titleFieldName="name"
					subtitleFieldName="delivery_country"
					deletable
					editable
					clickable
				/>
				<ModalCreateCustomer
					isOpen={isCustomerCreateModalOpen}
					onModalClose={() => setIsCustomerCreateModalOpen(false)}
					refreshList={fetchData}
				/>
			</Container>
		)
	}

	return <> {isLoaded ? customersListView() : LoadingView()} </>
}

export default withRouter(CustomersList)
