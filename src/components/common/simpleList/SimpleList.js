import React, { useState, useEffect } from 'react'
import './SimpleList.scss'
import SimpleListElement from './SimpleListElement'

export default function SimpleList({
	elementsList,
	deletable,
	editable,
	clickable,
	titleFieldName,
	subtitleFieldName,
}) {
	const [elements, setElements] = useState([])

	const defaultOnDeleteClick = (_el, index) => {
		const filteredElements = elements.filter(element => +element.key !== index)
		setElements(filteredElements)
	}

	function getListElementsHTML(itemsList, isListDeletable, isListEditable, isListClickable) {
		return itemsList.map((el, index) => {
			return (
				<SimpleListElement
					key={el.id ? el.id : index}
					index={index}
					isClickable={isListClickable}
					isEditable={isListEditable}
					isDeletable={isListDeletable}
					element={el}
					defaultOnDeleteClick={(element, id) => defaultOnDeleteClick(element, id)}
					title={el[titleFieldName]}
					subtitle={el[subtitleFieldName]}
				/>
			)
		})
	}

	useEffect(() => {
		const elementsHTML = getListElementsHTML(elementsList, deletable, editable, clickable)
		setElements(elementsHTML)
	}, [elementsList, deletable, editable, clickable])

	return (
		<div className="list-wrapper">
			<ul className="list">{elements}</ul>
		</div>
	)
}
