import React, { useState } from 'react'
import './SimpleListElement.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import ConfirmationModal from '../modals/confirmationModal/ConfirmationModal'

const SimpleListElement = props => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true)
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	const onDeleteButtonClick = e => {
		e.stopPropagation()
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
		<Row>
			<Col lg="12">
				<li
					className={`list-element ${
						props.isClickable && props.element.clickHandler ? 'clickable' : ''
					}`}
					onClick={props.element.clickHandler}
				>
					<span className="title">{props.title}</span>
					<span className="sub-title">{props.subtitle}</span>
					<span className="buttons-wrapper">
						{props.isEditable ? (
							<span className="edit-icon" onClick={props.element.editHandler} role="button">
								<FontAwesomeIcon icon={faEdit} />
							</span>
						) : null}
						{props.isDeletable ? (
							<span className="delete-icon" onClick={onDeleteButtonClick} role="button">
								<FontAwesomeIcon icon={faTrashAlt} />
							</span>
						) : null}
					</span>
				</li>
				<ConfirmationModal
					isOpen={isDeleteModalOpen}
					onModalClose={closeDeleteModal}
					onConfirm={onDeleteConfirm}
				/>
			</Col>
		</Row>
	)
}

export default SimpleListElement
