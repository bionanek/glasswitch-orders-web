import React, { useState } from 'react'
import './SimpleListElement.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import ConfirmationModal from '../modals/confirmationModal/ConfirmationModal'

const SimpleListElement = props => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const isDeletable = props.isDeletable === undefined ? true : props.isDeletable

	const onDeleteButtonClick = e => {
		e.stopPropagation()
		setIsDeleteModalOpen(!isDeleteModalOpen)
		// return
		// if (props.element.deleteHandler) {
		// 	props.element.deleteHandler(props.element.id)
		// } else {
		// 	props.defaultOnDeleteClick(props.element, props.index)
		// }
	}

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	return (
		<>
			<li
				className={`list-element ${
					props.isClickable && props.element.clickHandler ? 'clickable' : ''
				}`}
				onClick={props.element.clickHandler}
			>
				<span className="title">{props.element.name.toString()}</span>
				<span className="sub-title">{props.element.id.toString()}</span>
				<span className="buttons-wrapper">
					{props.isEditable && (
						<span className="edit-icon" onClick={props.element.editHandler} role="button">
							<FontAwesomeIcon icon={faEdit} />
						</span>
					)}
					{isDeletable && (
						<span className="delete-icon" onClick={onDeleteButtonClick} role="button">
							<FontAwesomeIcon icon={faTrashAlt} />
						</span>
					)}
				</span>
			</li>
			<ConfirmationModal isOpen={isDeleteModalOpen} onModalClose={closeDeleteModal} />
		</>
	)
}

export default SimpleListElement
