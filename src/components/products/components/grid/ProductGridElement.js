import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Button, ButtonGroup } from 'react-bootstrap/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ConfirmationModal from '../../../common/modals/confirmationModal/ConfirmationModal'

const ProductGridElement = props => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
			<Card
				style={{
					width: '12rem',
					margin: '5px',
					padding: '1px',
				}}
			>
				<Card.Img
					variant="top"
					style={{ cursor: 'pointer' }}
					src={props.imageUrl}
					onClick={props.element.clickHandler}
				/>
				<Card.Body>
					<Card.Title>{props.productCode}</Card.Title>
					<Card.Text>{props.productName}</Card.Text>
				</Card.Body>
				<ListGroup style={{ padding: '3px' }}>
					<ListGroupItem>{'PLN ' + props.pricePLN}</ListGroupItem>
					<ListGroupItem>{'EUR ' + props.priceEUR}</ListGroupItem>
					<ListGroupItem>{'USD ' + props.priceUSD}</ListGroupItem>

					{props.children ? (
						<ListGroupItem>{props.children}</ListGroupItem>
					) : (
						<ListGroupItem>
							<ButtonGroup style={{ width: '100%' }}>
								<Button onClick={props.element.editHandler} variant="secondary">
									<FontAwesomeIcon icon={faEdit} />
								</Button>

								<Button onClick={onDeleteButtonClick} variant="danger">
									<FontAwesomeIcon icon={faTrashAlt} />
								</Button>
							</ButtonGroup>
						</ListGroupItem>
					)}
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
