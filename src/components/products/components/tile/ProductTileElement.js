import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem } from 'react-bootstrap/'
import ConfirmationModal from '../../../common/modals/confirmationModal/ConfirmationModal'
import './ProductTileElement.scss'

const ProductTileElement = props => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const pushDetailsPage = () => {
		props.history.push(`/products/${props.id}`)
	}

	const pushEditPage = () => {
		props.history.push(`/products/${props.id}/edit`)
	}

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true)
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	const onDeleteButtonClick = event => {
		event.stopPropagation()
		openDeleteModal()
	}

	const onDeleteConfirm = () => {
		if (props.element.deleteHandler) {
			props.element.deleteHandler(props.element.id)
		} else {
			props.defaultOnDeleteClick(props.element, props.index)
		}
	}

	return (
		<>
			<Card className="product-tile" style={{ width: '18rem' }} onClick={pushDetailsPage}>
				<Card.Img variant="top" src={props.imageUrl} />
				<Card.Body>
					<Card.Title>
						{props.productCode}
						<ButtonGroup className="buttons-layout-change float-right">
							<Button variant="secondary" onClick={pushEditPage}>
								<FontAwesomeIcon icon={faEdit} />
							</Button>
							<Button variant="secondary" onClick={onDeleteButtonClick}>
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

export default withRouter(ProductTileElement)
