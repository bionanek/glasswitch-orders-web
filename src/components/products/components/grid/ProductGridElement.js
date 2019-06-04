import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem, Form } from 'react-bootstrap/'
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

					{props.element.editHandler ? (
						<ListGroupItem>
							<ButtonGroup style={{ width: '100%' }}>
								{props.element.editHandler ? (
									<Button onClick={props.element.editHandler} variant="secondary">
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								) : null}

								{props.element.deleteHandler ? (
									<Button onClick={onDeleteButtonClick} variant="danger">
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								) : null}
							</ButtonGroup>
						</ListGroupItem>
					) : null}

					{props.element.quantitySetter ? (
						<ListGroupItem>
							<Form.Control
								onChange={props.element.quantitySetter}
								type="number"
								name="quantity"
								placeholder={props.quantity ? null : 'Quantity'}
								defaultValue={props.quantity ? props.quantity : null}
							/>
						</ListGroupItem>
					) : null}
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
