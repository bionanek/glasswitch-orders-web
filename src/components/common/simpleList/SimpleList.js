import React from 'react'
import './SimpleList.scss'
import SimpleListElement from './SimpleListElement'

class SimpleList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { elements: [] }
	}

	componentWillReceiveProps(nextProps) {
		const elements = this.getListElementsHTML(
			nextProps.elements,
			nextProps.deletable,
			nextProps.editable,
			nextProps.clickable,
		)
		this.setState({ elements })
	}

	getListElementsHTML(elements, isListDeletable, isListEditable, isListClickable) {
		return elements.map((el, index) => {
			return (
				<SimpleListElement
					key={el.id ? el.id : index}
					index={index}
					isClickable={isListClickable}
					isEditable={isListEditable}
					isDeletable={isListDeletable}
					element={el}
					defaultOnDeleteClick={(element, id) => this.defaultOnDeleteClick(element, id)}
					title={el[this.props.titleFieldName]}
					subtitle={el[this.props.subtitleFieldName]}
				/>
			)
		})
	}

	defaultOnDeleteClick = (_el, index) => {
		this.elements = this.elements.filter(element => +element.key !== index)
		this.setState({ elements: this.elements })
	}

	render() {
		const { elements } = this.state
		return (
			<div className="list-wrapper">
				<ul className="list">{elements}</ul>
			</div>
		)
	}
}

export default SimpleList
