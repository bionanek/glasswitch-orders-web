import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ConfirmationModal(props) {
	const title = props.title ? props.title : 'Are you sure?'
	const message = props.message
		? props.message
		: 'Are you sure you want to continue? After deleting the item is gone!'

	const handleModalClose = () => {
		props.onModalClose()
	}

	const handleConfirm = () => {
		props.onConfirm()
	}

	return (
		<div>
			<Modal show={props.isOpen} onHide={() => handleModalClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{message}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleModalClose()}>
						Close
					</Button>
					<Button variant="danger" onClick={() => handleConfirm()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
