import React from 'react'
import Modal from 'react-bootstrap/Modal'
import './ImageModal.scss'

export default function ImageModal(props) {
	const handleModalClose = () => {
		props.onModalClose()
	}

	return (
		<div>
			<Modal show={props.isOpen} onHide={() => handleModalClose()}>
				<img src={props.source} className="image-zoom" alt="" />
			</Modal>
		</div>
	)
}
