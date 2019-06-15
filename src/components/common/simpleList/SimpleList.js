import React, { useState, useEffect } from 'react'
import './SimpleList.scss'
import { Col, Row } from 'react-bootstrap'
import SimpleListElement from './SimpleListElement'

export default function SimpleList({
	elementsList,
	titleFieldName,
	subtitleFieldName,
	clickable,
	editable,
	deletable,
	dynamicElement,
	onDelete,
	onClick,
}) {
	const [elements, setElements] = useState([])

	const defaultOnDeleteClick = (_el, index) => {
		const filteredElements = elements.filter(element => +element.key !== index)
		setElements(filteredElements)
	}

	function getListElementsHTML(itemsList, isListDeletable, isListEditable, isListClickable) {
		return itemsList.map((el, index) => {
			const id = el.id ? el.id : index
			return (
				<SimpleListElement
					key={id}
					index={index}
					isClickable={isListClickable}
					isEditable={isListEditable}
					isDeletable={isListDeletable}
					defaultOnDeleteClick={(element, elId) => defaultOnDeleteClick(element, elId)}
					onDelete={onDelete}
					onClick={onClick}
					element={el}
					title={el[titleFieldName]}
					subtitle={el[subtitleFieldName]}
				>
					{dynamicElement ? dynamicElement(id, el) : null}
				</SimpleListElement>
			)
		})
	}

	useEffect(() => {
		const elementsHTML = getListElementsHTML(elementsList, deletable, editable, clickable)
		setElements(elementsHTML)
	}, [elementsList, deletable, editable, clickable])

	return (
		<Row>
			<Col lg="12" className="list-wrapper">
				<ul className="list">{elements}</ul>
			</Col>
		</Row>
	)
}
