import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ProductCreateModal from '../modals/productCreate/ProductCreateModal'

export default function ProductCreateButton() {
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
			<ProductCreateModal isOpen={isProductCreateModalOpen} onModalClose={closeImageModal} />
		</>
	)
}
