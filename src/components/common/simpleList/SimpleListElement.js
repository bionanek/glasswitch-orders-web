import React from 'react'
import './SimpleListElement.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

const SimpleListElement = props => {
	const isDeletable = props.isDeletable === undefined ? true : props.isDeletable

	const onDeleteButtonClick = e => {
		e.stopPropagation()
		if (props.element.deleteHandler) {
			props.element.deleteHandler(props.element.id)
		} else {
			props.defaultOnDeleteClick(props.element, props.index)
		}
	}

	return (
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
	)
}

export default SimpleListElement
