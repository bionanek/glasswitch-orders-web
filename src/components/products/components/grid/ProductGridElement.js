import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem } from 'react-bootstrap/'
import ConfirmationModal from '../../../common/modals/confirmationModal/ConfirmationModal'

const ProductGridElement = props => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const openDetailsPage = () => {
		props.history.push(`/products/${props.id}/`)
	}

	const openEditPage = () => {
		props.history.push(`/products/${props.id}/edit`)
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	const onDeleteButtonClick = event => {
		event.stopPropagation()
		setIsDeleteModalOpen(true)
	}

	const onDeleteConfirm = () => {
		if (props.element.deleteHandler) {
			props.element.deleteHandler(props.element.id)
			return
		}
		props.defaultOnDeleteClick(props.element, props.index)
	}

	return (
		<>
			<Card style={{ width: '18rem', margin: '15px' }}>
				<Card.Img
					variant="top"
					style={{ cursor: 'pointer' }}
					src={props.imageUrl}
					onClick={openDetailsPage}
				/>
				<Card.Body>
					<Card.Title>
						{props.productCode}
						<ButtonGroup className="float-right">
							<Button variant="secondary" onClick={openEditPage}>
								<FontAwesomeIcon icon={faEdit} />
							</Button>

							<Button variant="danger" onClick={onDeleteButtonClick}>
								<FontAwesomeIcon icon={faTrashAlt} />
							</Button>
						</ButtonGroup>
					</Card.Title>
					<Card.Text>{props.productName}</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-currencies">
					<ListGroupItem>{'PLN ' + props.pricePLN}</ListGroupItem>
					<ListGroupItem>{'EUR ' + props.priceEUR}</ListGroupItem>
					<ListGroupItem>{'USD ' + props.priceUSD}</ListGroupItem>
				</ListGroup>
			</Card>

			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onModalClose={closeDeleteModal}
				onConfirm={onDeleteConfirm}
			/>
		</>
	)
}

export default withRouter(ProductGridElement)
