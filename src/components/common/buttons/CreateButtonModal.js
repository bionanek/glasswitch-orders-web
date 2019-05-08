import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ProductCreateModal from '../modals/createModal/CreateModal'

export default function ProductCreateButton(props) {
	const [isProductCreateModalOpen, setIsProductCreateModalOpen] = useState(false)

	const openImageModal = () => {
		setIsProductCreateModalOpen(true)
	}

	const closeImageModal = () => {
		setIsProductCreateModalOpen(false)
	}

	return (
		<>
			<Button variant="danger" onClick={openImageModal}>
				Create a Product
			</Button>
			<ProductCreateModal
				isOpen={isProductCreateModalOpen}
				onModalClose={closeImageModal}
				onRefreshList={props.onRefresh}
			/>
		</>
	)
}
