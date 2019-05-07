import React from 'react'

export default function ImageElement(props) {
	return <img src={props.source} className="rounded" alt={props.errorTxt} />
}
